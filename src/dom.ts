/**
 * Модуль работы с DOM
 * Предоставляет доступ ко всем необходимым элементам страницы
 */

import type { DOMElements } from './types.js';

/**
 * Сервис для работы с DOM элементами
 * Инкапсулирует все обращения к DOM API
 */
class DOMService {
  /** Кэш DOM элементов */
  private elements: DOMElements | null = null;

  /**
   * Инициализация сервиса
   * Находит и кэширует все необходимые DOM элементы
   * 
   * @throws {Error} Если какой-либо обязательный элемент не найден
   */
  init(): void {
    const examplesList = document.getElementById('examplesList');
    const cubesScheme = document.getElementById('cubesScheme');
    const checkButton = document.getElementById('checkButton') as HTMLButtonElement;
    const blocksContainer = document.getElementById('blocksContainer');
    const gameArea = document.querySelector('.game-area') as HTMLElement;

    if (!examplesList || !cubesScheme || !checkButton || !blocksContainer || !gameArea) {
      throw new Error('Не удалось найти необходимые DOM элементы');
    }

    this.elements = {
      examplesList,
      cubesScheme,
      checkButton,
      blocksContainer,
      gameArea
    };
  }

  /**
   * Получить DOM элемент по имени
   * 
   * @param name - Имя элемента из коллекции DOMElements
   * @returns DOM элемент
   * @throws {Error} Если сервис не инициализирован
   */
  get<K extends keyof DOMElements>(name: K): DOMElements[K] {
    if (!this.elements) {
      throw new Error('DOM сервис не инициализирован. Вызовите init() перед использованием.');
    }
    return this.elements[name];
  }
}

/**
 * Экспортируемый экземпляр сервиса DOM
 */
export const DOM = new DOMService();
