/**
 * Типы и интерфейсы приложения
 * Описывают структуры данных игры на умножение
 */

/**
 * Конфигурация игры
 */
export interface GameConfig {
  /** Множитель для всех примеров */
  multiplier: number;
  /** Длительность анимации в миллисекундах */
  animationDuration: number;
  /** Длительность показа неправильного ответа в миллисекундах */
  wrongAnswerDuration: number;
  /** Общее количество примеров в игре */
  totalExamples: number;
}

/**
 * Математический пример для решения
 */
export interface Example {
  /** Множитель (например, 4) */
  multiplier: number;
  /** Число, на которое умножается множитель */
  number: number;
  /** Правильный ответ */
  answer: number;
}

/**
 * Строка с примером в списке
 */
export interface ExampleRow {
  /** Уникальный идентификатор строки */
  id: string;
  /** Пример для решения */
  example: Example;
  /** DOM элемент строки */
  element: HTMLDivElement | null;
  /** Поле ввода для ответа */
  input: HTMLInputElement | null;
  /** Флаг: был ли дан ответ на этот пример */
  answered: boolean;
}

/**
 * Коллекция DOM элементов игры
 */
export interface DOMElements {
  /** Контейнер со списком примеров */
  examplesList: HTMLElement;
  /** Схема кубиков (подсказка) */
  cubesScheme: HTMLElement;
  /** Кнопка проверки ответа */
  checkButton: HTMLButtonElement;
  /** Контейнер для анимации блоков */
  blocksContainer: HTMLElement;
  /** Основная игровая область */
  gameArea: HTMLElement;
}

/**
 * Состояние игры
 */
export interface GameState {
  /** Список всех примеров */
  examples: ExampleRow[];
  /** ID текущего активного примера */
  currentExampleId: string | null;
  /** Количество решенных примеров */
  examplesSolved: number;
}

/**
 * Состояния кнопки проверки
 */
export type ButtonState = 'wrong' | 'right';
