/**
 * Модуль управления состоянием кнопки
 * Управляет визуальным состоянием кнопки проверки ответа
 */

import type { ButtonState } from './types.js';
import { DOM } from './dom.js';

/**
 * Менеджер состояния кнопки
 * Отвечает за изменение CSS классов и доступности кнопки
 */
class ButtonStateManager {
  /**
   * Добавить CSS класс состояния к кнопке
   * 
   * @param state - Состояние кнопки ('wrong' или 'right')
   */
  add(state: ButtonState): void {
    DOM.get('checkButton').classList.add(state);
  }

  /**
   * Удалить CSS класс состояния с кнопки
   * 
   * @param state - Состояние кнопки ('wrong' или 'right')
   */
  remove(state: ButtonState): void {
    DOM.get('checkButton').classList.remove(state);
  }

  /**
   * Сбросить все состояния кнопки
   * Удаляет все CSS классы состояний
   */
  reset(): void {
    this.remove('wrong');
    this.remove('right');
  }

  /**
   * Активировать кнопку
   * Делает кнопку доступной для нажатия и сбрасывает визуальные состояния
   */
  enable(): void {
    DOM.get('checkButton').disabled = false;
    this.reset();
  }

  /**
   * Деактивировать кнопку
   * Делает кнопку недоступной для нажатия
   */
  disable(): void {
    DOM.get('checkButton').disabled = true;
  }
}

/**
 * Экспортируемый экземпляр менеджера состояния кнопки
 */
export const buttonState = new ButtonStateManager();
