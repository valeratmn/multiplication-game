/**
 * Модуль обработки ответов
 * Проверяет ответы пользователя и управляет игровым процессом
 */

import type { ExampleRow } from './types.js';
import { CONFIG } from './config.js';
import { gameState } from './state.js';
import { buttonState } from './button-state.js';
import { ui } from './ui.js';

/**
 * Обработчик ответов пользователя
 * Отвечает за проверку ответов и реакцию на правильные/неправильные ответы
 */
class AnswerHandler {
  /** Callback функция для генерации нового примера */
  private onCorrectAnswerCallback: (() => void) | null = null;

  /**
   * Установить callback для генерации нового примера
   * 
   * @param callback - Функция, которая будет вызвана после правильного ответа
   */
  setOnCorrectAnswerCallback(callback: () => void): void {
    this.onCorrectAnswerCallback = callback;
  }

  /**
   * Проверить ответ пользователя
   * Сравнивает введенный ответ с правильным и выполняет соответствующие действия
   */
  check(): void {
    const current = gameState.getCurrentExample();
    if (!current) {
      return;
    }

    const rawValue = current.input?.value.trim() ?? '';
    const userAnswer = Number(rawValue);
    const correctAnswer = current.example.answer;

    const isIntegerAnswer = Number.isInteger(userAnswer);

    if (isIntegerAnswer && userAnswer === correctAnswer) {
      this.handleCorrect(current);
    } else {
      this.handleWrong(current);
    }
  }

  /**
   * Обработать правильный ответ
   * Отмечает пример как решенный и переходит к следующему
   * 
   * @param row - Строка с правильно решенным примером
   * @private
   */
  private handleCorrect(row: ExampleRow): void {
    if (!row.input) {
      return;
    }

    // Визуальная обратная связь
    row.input.classList.add('correct');
    row.input.disabled = true;
    
    // Убираем фокус с поля ввода (убирает рамку)
    row.input.blur();

    buttonState.add('right');
    buttonState.disable();

    // Обновление состояния
    gameState.markAnswered(row.id);
    gameState.incrementSolved();

    // Переход к следующему примеру или завершение игры
    setTimeout(() => {
      if (gameState.isGameComplete()) {
        ui.showCompletionMessage();
      } else {
        
        if (this.onCorrectAnswerCallback) {
          this.onCorrectAnswerCallback();
        }
      }
    }, 500);
  }

  /**
   * Обработать неправильный ответ
   * Показывает ошибку и дает возможность попробовать снова
   * 
   * @param row - Строка с неправильным ответом
   * @private
   */
  private handleWrong(row: ExampleRow): void {
    if (!row.input) {
      return;
    }

    // Визуальная обратная связь
    row.input.classList.add('wrong');
    buttonState.add('wrong');
    buttonState.disable();

    // Сброс через заданное время
    setTimeout(() => {
      if (row.input) {
        row.input.classList.remove('wrong');
        row.input.value = '';
        row.input.focus();
      }
      
      buttonState.remove('wrong');
      buttonState.disable();
    }, CONFIG.wrongAnswerDuration);
  }

  /**
   * Обработать ввод в поле ответа
   * Управляет доступностью кнопки проверки
   */
  handleInput(): void {
    const current = gameState.getCurrentExample();
    if (!current || !current.input) {
      return;
    }

    const value = current.input.value.trim();

    // Активируем кнопку только если введено валидное целое число
    const parsed = Number(value);
    const isValidInteger = value !== '' && Number.isInteger(parsed) && parsed >= 0;

    if (isValidInteger) {
      buttonState.enable();
    } else {
      buttonState.disable();
    }
  }
}

/**
 * Экспортируемый экземпляр обработчика ответов
 */
export const answerHandler = new AnswerHandler();
