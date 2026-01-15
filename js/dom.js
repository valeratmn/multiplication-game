/**
 * Модуль работы с DOM
 * Предоставляет доступ ко всем необходимым элементам страницы
 */
/**
 * Сервис для работы с DOM элементами
 * Инкапсулирует все обращения к DOM API
 */
class DOMService {
    constructor() {
        /** Кэш DOM элементов */
        this.elements = null;
    }
    /**
     * Инициализация сервиса
     * Находит и кэширует все необходимые DOM элементы
     *
     * @throws {Error} Если какой-либо обязательный элемент не найден
     */
    init() {
        const examplesList = document.getElementById('examplesList');
        const cubesScheme = document.getElementById('cubesScheme');
        const checkButton = document.getElementById('checkButton');
        const blocksContainer = document.getElementById('blocksContainer');
        const gameArea = document.querySelector('.game-area');
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
    get(name) {
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
//# sourceMappingURL=dom.js.map