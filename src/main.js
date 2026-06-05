import './style.css'

// For Filters

const checkboxes = document.querySelectorAll('.filter-checkbox');
const container = document.getElementById('active-filters-container');
const clearAllBtn = document.getElementById('clear-all-filters');

function syncFilters() {
  container.innerHTML = ''; 
  let activeCount = 0;

  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      activeCount++;
      
      const filterValue = checkbox.value && checkbox.value !== 'on' 
        ? checkbox.value 
        : document.querySelector(`label[for="${checkbox.id}"]`)?.textContent?.trim() || checkbox.id;
        
      const elementId = checkbox.id;

      const chip = `
        <div class="flex items-center gap-1 bg-white border border-gray-300 text-black text-xs font-medium px-2.5 py-1 rounded-[4px]">
          <span>${filterValue}</span>
          <button data-target-id="${elementId}" class=" filter-close-btn hover:bg-blue-100 p-0.5 rounded-full text-black hover:text-blue-600 transition-colors font-bold ml-1 cursor-pointer">
            ✕
          </button>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', chip);
    }
  });


  if (activeCount > 0) {
    clearAllBtn.classList.remove('hidden');
    clearAllBtn.classList.add('block');
  } else {
    clearAllBtn.classList.remove('block');
    clearAllBtn.classList.add('hidden');
    container.innerHTML = '<span class="text-sm text-gray-400 italic">No filters active</span>';
  }


  const closeButtons = container.querySelectorAll('.filter-close-btn');
  closeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = btn.getAttribute('data-target-id');
      

      const targetCheckbox = document.getElementById(targetId);
      if (targetCheckbox) {
        targetCheckbox.checked = false; 
        syncFilters();            
      }
    });
  });
}


clearAllBtn.addEventListener('click', (e) => {
  e.preventDefault(); 
  checkboxes.forEach(checkbox => {
    checkbox.checked = false; 
  });
  syncFilters(); 
});


checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', syncFilters);
});

