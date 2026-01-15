/**
 * Модуль главного контроллера игры
 * Координирует работу всех компонентов приложения
 */

import type { ExampleRow } from './types.js';
import { DOM } from './dom.js';
import { gameState } from './state.js';
import { exampleGenerator } from './example-generator.js';
import { cubesScheme } from './cubes-scheme.js';
import { buttonState } from './button-state.js';
import { answerHandler } from './answer-handler.js';

/**
 * Главный контроллер игры
 * Управляет инициализацией, жизненным циклом игры и взаимодействием модулей
 */
class GameController {
  /**
   * Инициализация игры
   * Запускает все необходимые сервисы и начинает игру
   */
  init(): void {
    // Инициализация всех сервисов
    DOM.init();
    gameState.init();

    // Установка callback для генерации новых примеров
    answerHandler.setOnCorrectAnswerCallback(() => this.generateNewExample());

    // Генерация первого примера
    this.generateNewExample();
    
    // Установка глобальных обработчиков
    this.setupGlobalHandlers();
  }

  /**
   * Генерировать новый пример
   * Создает новый математический пример с визуальным представлением и анимацией
   */
  generateNewExample(): void {
    // Генерация примера
    const example = exampleGenerator.generate();
    const row = exampleGenerator.createExampleRow(example);

    // Сброс состояния кнопки
    buttonState.disable();
    buttonState.reset();

    // Подключение обработчиков для нового примера
    this.attachInputHandlers(row);
    
    // Анимация кубиков (первый пример без анимации)
    const isFirstExample = gameState.getExamples().length === 1;
    cubesScheme.animateForNewExample(row, isFirstExample);
  }

  /**
   * Подключить обработчики событий к полю ввода
   * 
   * @param row - Строка с примером
   * @private
   */
  private attachInputHandlers(row: ExampleRow): void {
    if (!row.input) {
      return;
    }

    const button = DOM.get('checkButton');
    
    // Обработчик ввода текста
    row.input.addEventListener('input', () => answerHandler.handleInput());
    
    // Обработчик нажатия Enter
    row.input.addEventListener('keypress', (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !button.disabled) {
        answerHandler.check();
      }
    });
  }

  /**
   * Установить глобальные обработчики событий
   * Подключает обработчик клика по кнопке проверки
   * 
   * @private
   */
  private setupGlobalHandlers(): void {
    const button = DOM.get('checkButton');
    button.addEventListener('click', () => answerHandler.check());
  }
}

/**
 * Экспортируемый экземпляр контроллера игры
 */
export const gameController = new GameController();
