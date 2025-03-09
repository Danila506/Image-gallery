document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('button[data-category]');
    const imagesContainer = document.getElementById('image-gallery');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const closeModalButton = document.getElementById('close-modal');
    const uploadForm = document.getElementById('upload-form');

    // Изначально выделяем кнопку "Все"
    const allButton = document.querySelector('button[data-category="all"]');
    allButton.classList.remove('bg-[#A04970]');
    allButton.classList.add('bg-[#3B7F99]');

    // Функция для фильтрации изображений по категории
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const category = this.getAttribute('data-category');

            // Убираем активный класс у всех кнопок
            buttons.forEach(btn => {
                btn.classList.remove('bg-[#3B7F99]'); // Цвет, как при hover
                btn.classList.add('bg-[#A04970]'); // Исходный цвет
            });

            // Добавляем активный класс к выбранной кнопке
            this.classList.remove('bg-[#A04970]');
            this.classList.add('bg-[#3B7F99]');

            // Фильтрация изображений
            const images = document.querySelectorAll('li[data-category]');
            images.forEach(image => {
                if (image.getAttribute('data-category') === category || category === 'all') {
                    image.style.display = 'block';
                } else {
                    image.style.display = 'none';
                }
            });
        });
    });

    // Функция для открытия модального окна
    function openModal(imageElement) {
        const fullSizeSrc = imageElement.getAttribute('data-full');
        modalImage.setAttribute('src', fullSizeSrc);
        modalImage.setAttribute('alt', imageElement.getAttribute('alt'));

        // Плавное появление модального окна
        gsap.fromTo(
            modal,
            { opacity: 0, scale: 0.8, display: 'none' }, // Начальное состояние
            {
                opacity: 1,
                scale: 1,
                display: 'flex',
                duration: 0.3,
                ease: 'power2.out',
            }
        );
    }

    // Обработчик клика для изображений в галерее
    imagesContainer.addEventListener('click', function (event) {
        if (event.target.tagName === 'IMG') {
            openModal(event.target);
        }
    });

    // Закрытие модального окна
    closeModalButton.addEventListener('click', function () {
        // Плавное исчезновение модального окна
        gsap.to(modal, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            ease: 'power2.out',
            onComplete: () => {
                modal.style.display = 'none'; // Скрываем модальное окно после анимации
            },
        });
    });

    // Закрытие модального окна при клике вне изображения
    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            // Плавное исчезновение модального окна
            gsap.to(modal, {
                opacity: 0,
                scale: 0.8,
                duration: 0.3,
                ease: 'power2.out',
                onComplete: () => {
                    modal.style.display = 'none'; // Скрываем модальное окно после анимации
                },
            });
        }
    });

    // Обработка формы для добавления изображения
    uploadForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const category = document.getElementById('category').value;
        const fileInput = document.getElementById('image');
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imageUrl = e.target.result;

                // Создаем новый элемент изображения
                const newImageItem = document.createElement('li');
                newImageItem.classList.add('image-item', 'opacity-100', 'visible');
                newImageItem.setAttribute('data-category', category);

                const newImage = document.createElement('img');
                newImage.classList.add(
                    'w-full',
                    'h-32',
                    'sm:h-48',
                    'md:h-64',
                    'object-cover',
                    'rounded-lg',
                    'cursor-pointer'
                );
                newImage.setAttribute('src', imageUrl);
                newImage.setAttribute('alt', 'Новое изображение');
                newImage.setAttribute('data-full', imageUrl);

                // Добавляем обработчик клика для нового изображения
                newImage.addEventListener('click', function () {
                    openModal(newImage);
                });

                newImageItem.appendChild(newImage);
                imagesContainer.appendChild(newImageItem);

                // Очищаем форму
                uploadForm.reset();
            };
            reader.readAsDataURL(file);
        }
    });
});