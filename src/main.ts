/**
 * Точка входа приложения
 * Запускает игру после загрузки DOM
 */

import { gameController } from './game-controller.js';

/**
 * Инициализация приложения
 * Ожидает полной загрузки DOM перед запуском игры
 */
document.addEventListener('DOMContentLoaded', () => {
  gameController.init();
});
