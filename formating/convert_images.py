import os
from PIL import Image

def convert_images_in_directory(input_dir, output_dir, quality=80):
    # Проверяем, существует ли директория для вывода, если нет - создаём
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Проходим по всем файлам в директории
    for filename in os.listdir(input_dir):
        input_path = os.path.join(input_dir, filename)

        # Проверяем, что это изображение (по расширению)
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            # Формируем путь для сохранения результата
            output_path = os.path.join(output_dir, os.path.splitext(filename)[0] + '.webp')

            try:
                # Открываем изображение
                with Image.open(input_path) as img:
                    # Конвертируем и сохраняем в WebP
                    img.save(output_path, 'WEBP', quality=quality)
                    print(f"Изображение '{filename}' успешно конвертировано в {output_path}")
            except Exception as e:
                print(f"Не удалось обработать {filename}: {e}")

# Пример использования
input_dir = 'frames'  # Папка с исходными изображениями
output_dir = 'frames-optimized'  # Папка для сохранения конвертированных изображений
convert_images_in_directory(input_dir, output_dir)
