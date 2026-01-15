/**
 * Модуль схемы кубиков
 * Управляет отображением и анимацией кубиков-подсказок
 */

import type { ExampleRow } from './types.js';
import { CONFIG } from './config.js';
import { exampleGenerator } from './example-generator.js';
import { blocksAnimation } from './blocks-animation.js';

/**
 * Менеджер схемы кубиков
 * Отвечает за визуализацию кубиков-подсказок для каждого примера
 */
class CubesScheme {
  /**
   * Инициализация схемы кубиков
   * Подготовка к анимации появления кубиков
   */


  /**
   * Создать и анимировать кубики для нового примера
   * 
   * @param row - Строка с примером
   * @param isFirstExample - Флаг: является ли это первым примером
   *                         (для первого примера кубики появляются без анимации)
   */
  animateForNewExample(row: ExampleRow, isFirstExample: boolean): void {
    if (!row.element) {
      throw new Error('У строки с примером отсутствует DOM элемент');
    }

    // Создаем контейнер для кубиков этой строки
    const cubesContainer = document.createElement('div');
    cubesContainer.className = 'row-cubes';
    
    // Создаем 4 кубика
    for (let i = 0; i < 4; i++) {
      const cube = document.createElement('div');
      cube.className = 'cube';
      cubesContainer.appendChild(cube);
    }
    
    row.element.appendChild(cubesContainer);
    
    if (isFirstExample) {
      // Первый пример - кубики появляются сразу, без анимации
      exampleGenerator.enableInput(row);
    } else {
      // Скрываем настоящие кубики сразу
      cubesContainer.style.visibility = 'hidden';
      
      // Даём браузеру отрисовать элемент чтобы получить его позицию
      requestAnimationFrame(() => {
        blocksAnimation.startForRow(cubesContainer);
        
        // Активируем ввод после завершения анимации
        setTimeout(() => {
          exampleGenerator.enableInput(row);
        }, CONFIG.animationDuration + 100);
      });
    }
  }
}

/**
 * Экспортируемый экземпляр менеджера схемы кубиков
 */
export const cubesScheme = new CubesScheme();
