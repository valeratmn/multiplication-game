/**
 * Модуль анимации блоков
 * Управляет визуальной анимацией появления кубиков
 */
import { CONFIG } from './config.js';
import { DOM } from './dom.js';
/**
 * Менеджер анимации блоков
 * Отвечает за анимацию появления кубиков снизу вверх
 */
class BlocksAnimation {
    /**
     * Запустить анимацию для строки с примером
     * Создает временную группу кубиков, которая появляется снизу экрана
     * и перемещается к целевой позиции
     *
     * @param cubesContainer - Контейнер кубиков в строке (целевая позиция)
     */
    startForRow(cubesContainer) {
        // Получаем позицию, где должны быть кубики
        const targetRect = cubesContainer.getBoundingClientRect();
        // Создаем анимированную группу кубиков
        const animatedGroup = document.createElement('div');
        animatedGroup.className = 'animated-cubes-group';
        // Создаем 4 кубика в анимированной группе
        for (let i = 0; i < 4; i++) {
            const cube = document.createElement('div');
            cube.className = 'cube';
            animatedGroup.appendChild(cube);
        }
        // Стартовая позиция - внизу экрана, в той же X позиции что и целевая
        animatedGroup.style.left = `${targetRect.left}px`;
        animatedGroup.style.top = `${window.innerHeight}px`; // За нижним краем экрана
        DOM.get('blocksContainer').appendChild(animatedGroup);
        // Запускаем анимацию (небольшая задержка для корректного рендера)
        setTimeout(() => {
            animatedGroup.style.transition = 'top 0.5s ease-out';
            animatedGroup.style.top = `${targetRect.top}px`;
        }, 50);
        // После анимации удаляем временную группу и показываем настоящие кубики
        setTimeout(() => {
            if (animatedGroup.parentNode) {
                animatedGroup.parentNode.removeChild(animatedGroup);
            }
            cubesContainer.style.visibility = 'visible';
        }, CONFIG.animationDuration + 50);
    }
}
/**
 * Экспортируемый экземпляр менеджера анимации
 */
export const blocksAnimation = new BlocksAnimation();
//# sourceMappingURL=blocks-animation.js.map