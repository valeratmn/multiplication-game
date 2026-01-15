/**
 * Модуль управления состоянием игры
 * Хранит и управляет всеми данными игры
 */
import { CONFIG } from './config.js';
/**
 * Менеджер состояния игры
 * Отвечает за хранение и изменение состояния приложения
 */
class GameStateManager {
    constructor() {
        /** Список всех примеров */
        this.examples = [];
        /** ID текущего активного примера */
        this.currentExampleId = null;
        /** Количество решенных примеров */
        this.examplesSolved = 0;
    }
    /**
     * Инициализация состояния игры
     * Сбрасывает все данные к начальным значениям
     */
    init() {
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
    addExample(example) {
        const id = `example-${Date.now()}-${Math.random()}`;
        const row = {
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
    getCurrentExample() {
        return this.examples.find(e => e.id === this.currentExampleId) || null;
    }
    /**
     * Отметить пример как отвеченный
     *
     * @param id - ID примера
     */
    markAnswered(id) {
        const example = this.examples.find(e => e.id === id);
        if (example) {
            example.answered = true;
        }
    }
    /**
     * Увеличить счетчик решенных примеров
     */
    incrementSolved() {
        this.examplesSolved++;
    }
    /**
     * Проверить, завершена ли игра
     *
     * @returns true, если решены все примеры
     */
    isGameComplete() {
        return this.examplesSolved >= CONFIG.totalExamples;
    }
    /**
     * Получить количество решенных примеров
     *
     * @returns Количество решенных примеров
     */
    getSolvedCount() {
        return this.examplesSolved;
    }
    /**
     * Получить все примеры
     *
     * @returns Массив всех примеров
     */
    getExamples() {
        return this.examples;
    }
}
/**
 * Экспортируемый экземпляр менеджера состояния
 */
export const gameState = new GameStateManager();
//# sourceMappingURL=state.js.map