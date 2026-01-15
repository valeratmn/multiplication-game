/**
 * Модуль управления состоянием кнопки
 * Управляет визуальным состоянием кнопки проверки ответа
 */
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
    add(state) {
        DOM.get('checkButton').classList.add(state);
    }
    /**
     * Удалить CSS класс состояния с кнопки
     *
     * @param state - Состояние кнопки ('wrong' или 'right')
     */
    remove(state) {
        DOM.get('checkButton').classList.remove(state);
    }
    /**
     * Сбросить все состояния кнопки
     * Удаляет все CSS классы состояний
     */
    reset() {
        this.remove('wrong');
        this.remove('right');
    }
    /**
     * Активировать кнопку
     * Делает кнопку доступной для нажатия и сбрасывает визуальные состояния
     */
    enable() {
        DOM.get('checkButton').disabled = false;
        this.reset();
    }
    /**
     * Деактивировать кнопку
     * Делает кнопку недоступной для нажатия
     */
    disable() {
        DOM.get('checkButton').disabled = true;
    }
}
/**
 * Экспортируемый экземпляр менеджера состояния кнопки
 */
export const buttonState = new ButtonStateManager();
//# sourceMappingURL=button-state.js.map