document.addEventListener('DOMContentLoaded', () => {
    // Сначала проверяем URL параметры
    const urlParams = new URLSearchParams(window.location.search);
    const plantId = urlParams.get('id');
    
    if (plantId) {
        // Если есть ID в URL, используем его для поиска растения
        const plant = plants[parseInt(plantId)];
        if (plant) {
            displayPlantDetails(plant);
            return;
        }
    }
    
    // Если нет ID в URL или растение не найдено, проверяем localStorage
    const plantData = localStorage.getItem('selectedPlant');
    if (plantData) {
        const plant = JSON.parse(plantData);
        displayPlantDetails(plant);
    } else {
        handlePlantNotFound();
    }
});

function displayPlantDetails(plant) {
    // Update page title
    document.title = `GreenNook - ${plant.name}`;

    // Update plant details
    const imageName = plant.englishName.replace(/\s+/g, '');
    document.getElementById('plantImage').src = plant.img;
    document.getElementById('plantImage').alt = plant.name;
    document.getElementById('plantNameRu').textContent = plant.name;
    document.getElementById('plantNameEn').textContent = plant.englishName;
    document.getElementById('plantDescription').textContent = plant.description;
    document.getElementById('lightingInfo').textContent = plant.light;
    document.getElementById('temperatureInfo').textContent = plant.temperature;
    document.getElementById('wateringInfo').textContent = plant.watering;
    document.getElementById('careInfo').textContent = plant.care;

    // Update breadcrumbs
    updateBreadcrumbs(plant);
}

function updateBreadcrumbs(plant) {
    const breadcrumbs = document.querySelector('.breadcrumbs');
    breadcrumbs.innerHTML = `
        <a href="index.html">Главное</a> /
        <a href="catalog.html">Каталог</a> /
        <span>${plant.name}</span>
    `;
}

function handlePlantNotFound() {
    const productDetail = document.querySelector('.product-detail');
    productDetail.innerHTML = `
        <div class="error-message">
            <h2>Растение не найдено</h2>
            <p>К сожалению, информация о данном растении недоступна.</p>
            <a href="catalog.html" class="button">Вернуться в каталог</a>
        </div>
    `;
}
