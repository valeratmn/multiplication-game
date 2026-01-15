/**
 * Модуль пользовательского интерфейса
 * Управляет отображением UI элементов и сообщений
 */

import { CONFIG } from './config.js';
import { DOM } from './dom.js';

/**
 * Менеджер пользовательского интерфейса
 * Отвечает за визуальную обратную связь и сообщения пользователю
 */
class UI {
  /**
   * Показать сообщение о завершении игры
   * Отображает поздравительное сообщение после решения всех примеров
   */
  showCompletionMessage(): void {
    const message = document.createElement('div');
    message.className = 'completion-message show';
    message.textContent = `Поздравляем! Вы решили все ${CONFIG.totalExamples} примеров!`;
    
    DOM.get('gameArea').appendChild(message);
  }
}

/**
 * Экспортируемый экземпляр менеджера UI
 */
export const ui = new UI();
