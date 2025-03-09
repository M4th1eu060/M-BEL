document.addEventListener('DOMContentLoaded', () => {
    const configurator = document.querySelector('.configurator-container');
    if (!configurator) return;
    
    // Obtener el tipo de producto desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productType = urlParams.get('product') || 'default';
    
    // Estado de configuración del producto (simplificado a solo dimensiones)
    let productConfig = {
        type: productType,
        dimensions: {
            width: 80,
            height: 40,
            depth: 40
        },
        quantity: 1
    };
    
    // Precios base de los productos (en euros)
    const basePrices = {
        'mesa-centro': 1570,
        'estanteria': 750,
        'silla-contemporanea': 520,
        'silla': 520,
        'lampara-moderna': 250,
        'lampara-de-pie': 800,
        'estanteria-modular':850,
        'organizador-cocina':375,
        'mueble-bano':520,
        'escritorio-infantil':180,
        'default': 500 // Precio por defecto para cualquier producto en el caso de que no haya sido listado
    };
    
    // Elementos
    const productPreview = document.getElementById('product-preview');
    const widthInput = document.getElementById('width');
    const heightInput = document.getElementById('height');
    const depthInput = document.getElementById('depth');
    const quantityInput = document.getElementById('quantity');
    const rotateLeftBtn = document.getElementById('rotate-left');
    const rotateRightBtn = document.getElementById('rotate-right');
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const priceDisplay = document.getElementById('price-value');
    const addToCartBtn = document.getElementById('add-to-cart');
    const saveConfigBtn = document.getElementById('save-config');
    
    // Inicializar vista previa del producto
    const updateProductPreview = () => {
        // Establecer ruta de imagen base según el tipo de producto
        let imagePath = `imagenes_html/productos/configurador/${productType}-preview.jpg`;
        productPreview.src = imagePath;
        
        // Actualizar las dimensiones del producto en la vista previa (visualizado mediante escala)
        const scale = Math.min(
            Math.max(productConfig.dimensions.width / 100, 0.5),
            Math.max(productConfig.dimensions.height / 100, 0.5),
            Math.max(productConfig.dimensions.depth / 100, 0.5)
        );
        
        productPreview.style.transform = `scale(${scale})`;
    };
    
    // Calcular y actualizar precio
    const updatePrice = () => {
        console.log("Tipo de producto:", productConfig.type); // Depuración
        console.log("Precios disponibles:", Object.keys(basePrices)); // Depuración
        
        // Obtener el precio base, con manejo de fallback
        const basePrice = basePrices[productConfig.type] || basePrices.default;
        console.log("Precio base seleccionado:", basePrice); // Depuración
        
        // Calcular factor de volumen basado en dimensiones
        const standardVolume = 80 * 40 * 40; // Dimensiones estándar del producto
        const actualVolume = productConfig.dimensions.width * 
                             productConfig.dimensions.height * 
                             productConfig.dimensions.depth;
        const volumeFactor = Math.max(0.5, actualVolume / standardVolume);
        console.log("Factor de volumen:", volumeFactor); // Depuración
        
        // Calcular precio final
        let finalPrice = basePrice * volumeFactor * productConfig.quantity;
        console.log("Precio final (sin redondear):", finalPrice); // Depuración
        
        // Redondear a 2 decimales
        finalPrice = Math.round(finalPrice * 100) / 100;
        console.log("Precio final (redondeado):", finalPrice); // Depuración
        
        // Actualizar display con formato correcto
        if (isNaN(finalPrice)) {
            console.error("Error: El precio calculado no es un número válido");
            priceDisplay.textContent = "Error de cálculo";
        } else {
            priceDisplay.textContent = `${finalPrice} €`;
        }
    };
    
    // Inicializar configuración
    const initializeConfig = () => {
        // Establecer título del producto
        const productTitle = document.getElementById('product-title');
        if (productTitle) {
            const productNames = {
                'mesa-centro': 'Mesa de Centro Orgánica',
                'estanteria': 'Estantería de Biblioteca',
                'silla-contemporanea': 'Silla Contemporánea',
                'silla': 'Silla Ergonómica',
                'lampara-moderna': 'Lámpara de Escritorio',
                'lampara-de-pie': 'Lámpara de Pie',
                'estanteria-modular': 'Estantería Modular',
                'organizador-cocina': 'Organizador de Cocina',
                'mueble-bano': 'Mueble de Baño',
                'escritorio-infantil': 'Escritorio Infantil',
                'default': 'Producto Personalizado'

            };
            
            productTitle.textContent = `Configurador de Dimensiones: ${productNames[productConfig.type] || productNames.default}`;
        }
        
        console.log("Inicializando configuración para producto:", productConfig.type); // Depuración
        
        // Establecer valores predeterminados en los inputs
        if (widthInput) widthInput.value = productConfig.dimensions.width;
        if (heightInput) heightInput.value = productConfig.dimensions.height;
        if (depthInput) depthInput.value = productConfig.dimensions.depth;
        if (quantityInput) quantityInput.value = productConfig.quantity;
        
        // Actualizar vista previa y precio
        updateProductPreview();
        updatePrice();
    };
    
    // Event Listeners
    
    // Inputs de dimensiones
    if (widthInput) {
        widthInput.addEventListener('input', () => {
            productConfig.dimensions.width = parseInt(widthInput.value) || 80;
            updateProductPreview();
            updatePrice();
        });
    }
    
    if (heightInput) {
        heightInput.addEventListener('input', () => {
            productConfig.dimensions.height = parseInt(heightInput.value) || 40;
            updateProductPreview();
            updatePrice();
        });
    }
    
    if (depthInput) {
        depthInput.addEventListener('input', () => {
            productConfig.dimensions.depth = parseInt(depthInput.value) || 40;
            updateProductPreview();
            updatePrice();
        });
    }
    
    // Input de cantidad
    if (quantityInput) {
        quantityInput.addEventListener('input', () => {
            productConfig.quantity = parseInt(quantityInput.value) || 1;
            updatePrice();
        });
    }
    
    // Controles de vista previa
    let currentRotation = 0;
    let currentScale = 1;
    
    if (rotateLeftBtn) {
        rotateLeftBtn.addEventListener('click', () => {
            currentRotation -= 90;
            productPreview.style.transform = `scale(${currentScale}) rotate(${currentRotation}deg)`;
        });
    }
    
    if (rotateRightBtn) {
        rotateRightBtn.addEventListener('click', () => {
            currentRotation += 90;
            productPreview.style.transform = `scale(${currentScale}) rotate(${currentRotation}deg)`;
        });
    }
    
    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', () => {
            currentScale = Math.min(2, currentScale + 0.1);
            productPreview.style.transform = `scale(${currentScale}) rotate(${currentRotation}deg)`;
        });
    }
    
    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', () => {
            currentScale = Math.max(0.5, currentScale - 0.1);
            productPreview.style.transform = `scale(${currentScale}) rotate(${currentRotation}deg)`;
        });
    }
    
    // Botón añadir al carrito
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            // Mostrar mensaje de éxito por añadir al carrito
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Producto añadido al carrito correctamente';
            
            configurator.appendChild(successMessage);
            
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        });
    }
    
    // Botón guardar configuración
    if (saveConfigBtn) {
        saveConfigBtn.addEventListener('click', () => {
            // Mostrar mensaje de éxito por guardar configuración
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Configuración guardada correctamente';
            
            configurator.appendChild(successMessage);
            
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        });
    }
    
    // Inicializar
    initializeConfig();
});
