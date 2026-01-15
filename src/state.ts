/**
 * Модуль управления состоянием игры
 * Хранит и управляет всеми данными игры
 */

import type { Example, ExampleRow } from './types.js';
import { CONFIG } from './config.js';

/**
 * Менеджер состояния игры
 * Отвечает за хранение и изменение состояния приложения
 */
class GameStateManager {
  /** Список всех примеров */
  private examples: ExampleRow[] = [];
  
  /** ID текущего активного примера */
  private currentExampleId: string | null = null;
  
  /** Количество решенных примеров */
  private examplesSolved: number = 0;

  /**
   * Инициализация состояния игры
   * Сбрасывает все данные к начальным значениям
   */
  init(): void {
    this.examples = [];
    this.currentExampleId = null;
    this.examplesSolved = 0;
  }

  /**
   * Добавить новый пример в игру
   * 
   * @param example - Математический пример для решения
   * @returns Созданная строка с примером
   */
  addExample(example: Example): ExampleRow {
    const id = `example-${Date.now()}-${Math.random()}`;
    const row: ExampleRow = {
      id,
      example,
      element: null,
      input: null,
      answered: false
    };
    
    this.examples.push(row);
    this.currentExampleId = id;
    
    return row;
  }

  /**
   * Получить текущий активный пример
   * 
   * @returns Текущий пример или null, если нет активного
   */
  getCurrentExample(): ExampleRow | null {
    return this.examples.find(e => e.id === this.currentExampleId) || null;
  }

  /**
   * Отметить пример как отвеченный
   * 
   * @param id - ID примера
   */
  markAnswered(id: string): void {
    const example = this.examples.find(e => e.id === id);
    if (example) {
      example.answered = true;
    }
  }

  /**
   * Увеличить счетчик решенных примеров
   */
  incrementSolved(): void {
    this.examplesSolved++;
  }

  /**
   * Проверить, завершена ли игра
   * 
   * @returns true, если решены все примеры
   */
  isGameComplete(): boolean {
    return this.examplesSolved >= CONFIG.totalExamples;
  }

  /**
   * Получить количество решенных примеров
   * 
   * @returns Количество решенных примеров
   */
  getSolvedCount(): number {
    return this.examplesSolved;
  }

  /**
   * Получить все примеры
   * 
   * @returns Массив всех примеров
   */
  getExamples(): ExampleRow[] {
    return this.examples;
  }
}

/**
 * Экспортируемый экземпляр менеджера состояния
 */
export const gameState = new GameStateManager();
