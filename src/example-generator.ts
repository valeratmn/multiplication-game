/**
 * Модуль генерации примеров
 * Создает математические примеры и их визуальное представление
 */

import type { Example, ExampleRow } from './types.js';
import { CONFIG } from './config.js';
import { DOM } from './dom.js';
import { gameState } from './state.js';

/**
 * Генератор примеров
 * Отвечает за создание случайных примеров и DOM элементов для них
 */
class ExampleGenerator {
  /**
   * Генерировать новый случайный пример
   * 
   * @returns Новый математический пример
   */
  generate(): Example {
    const number = Math.floor(Math.random() * 10) + 1;
    
    return {
      multiplier: CONFIG.multiplier,
      number: number,
      answer: CONFIG.multiplier * number
    };
  }

  /**
   * Создать DOM элемент строки с примером
   * 
   * @param example - Математический пример
   * @returns Созданная строка с примером
   */
  createExampleRow(example: Example): ExampleRow {
    const row = gameState.addExample(example);
    
    // Создание контейнера строки
    const rowElement = document.createElement('div');
    rowElement.className = 'example-row';
    rowElement.id = row.id;
    
    // Множитель (например, 4)
    const multiplier = document.createElement('span');
    multiplier.className = 'multiplier';
    multiplier.textContent = example.multiplier.toString();
    
    // Знак умножения
    const multiplySign = document.createElement('span');
    multiplySign.className = 'multiply-sign';
    multiplySign.textContent = '×';
    
    // Число (например, 3)
    const number = document.createElement('span');
    number.className = 'number';
    number.textContent = example.number.toString();
    
    // Знак равенства
    const equalsSign = document.createElement('span');
    equalsSign.className = 'equals-sign';
    equalsSign.textContent = '=';
    
    // Поле ввода для ответа
    const input = document.createElement('input');
    input.type = 'number';
    input.className = 'answer-input';
    input.placeholder = '';
    input.min = '0';
    input.step = '1';
    input.inputMode = 'numeric';
    input.disabled = true;
    
    // Сборка элемента
    rowElement.appendChild(multiplier);
    rowElement.appendChild(multiplySign);
    rowElement.appendChild(number);
    rowElement.appendChild(equalsSign);
    rowElement.appendChild(input);
    
    // Добавление в список с анимацией появления
    const list = DOM.get('examplesList');
    rowElement.style.opacity = '0';
    rowElement.style.transform = 'translateY(-20px)';
    list.appendChild(rowElement);
    
    // Анимация появления
    requestAnimationFrame(() => {
      rowElement.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      rowElement.style.opacity = '1';
      rowElement.style.transform = 'translateY(0)';
    });
    
    // Сохранение ссылок на элементы
    row.element = rowElement;
    row.input = input;
    
    return row;
  }

  /**
   * Активировать поле ввода для строки
   * 
   * @param row - Строка с примером
   */
  enableInput(row: ExampleRow): void {
    if (row.input) {
      row.input.disabled = false;
      row.input.focus();
    }
  }
}

/**
 * Экспортируемый экземпляр генератора примеров
 */
export const exampleGenerator = new ExampleGenerator();
