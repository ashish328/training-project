import { ref, computed, watch } from "vue";

export default function useSearch(items, searchProp) {
  const searchTerm = ref("");
  const activeSearchTerm = ref("");
  const updateSearch = (val) => {
    console.log(val);
    searchTerm.value = val;
  };

  const availableItems = computed(() => {
    let filteredItems = [];
    if (activeSearchTerm.value) {
      filteredItems = items.value.filter((item) =>
        item[searchProp]
          .toLocaleLowerCase()
          .includes(activeSearchTerm.value.toLocaleLowerCase())
      );
    } else if (items.value) {
      filteredItems = items.value;
    }
    return filteredItems;
  });

  watch(searchTerm, (val) => {
    setTimeout(() => {
      if (val === searchTerm.value) {
        activeSearchTerm.value = val;
      }
    }, 300);
  });

  return {
    searchTerm,
    updateSearch,
    availableItems,
  };
}
