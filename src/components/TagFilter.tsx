import React, { useState, useRef, useEffect } from "react";
import { TAG_CATEGORIES, getTagsByCategory, TagCategory, getTagById } from "@/models/tagDefinitions";
import { useFoodinatorStore } from "@/store/useFoodinatorStore";
import { Icon } from "@/components/Icon";

export const TagFilter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { searchState, addTag, removeTag, clearTags } = useFoodinatorStore();

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Categories that allow only one selection
  const singleSelectCategories: TagCategory[] = ["cookingMethod", "base", "proteinSource"];

  const handleTagClick = (tagId: string) => {
    const selectedTags = searchState.selectedTags || [];
    const tag = getTagById(tagId);

    if (!tag) return;

    if (selectedTags.includes(tagId)) {
      removeTag(tagId);
    } else {
      // For single-select categories, remove any existing tag from the same category
      if (singleSelectCategories.includes(tag.category)) {
        const categoryTags = getTagsByCategory(tag.category);
        const existingTagInCategory = selectedTags.find(selectedTagId =>
          categoryTags.some(categoryTag => categoryTag.id === selectedTagId),
        );

        if (existingTagInCategory) {
          removeTag(existingTagInCategory);
        }
      }

      addTag(tagId);
    }
  };

  // Helper function to check if a category has any selected tags
  const getCategorySelectedTag = (category: TagCategory): string | null => {
    const selectedTags = searchState.selectedTags || [];
    const categoryTags = getTagsByCategory(category);
    return selectedTags.find(selectedTagId =>
      categoryTags.some(categoryTag => categoryTag.id === selectedTagId),
    ) || null;
  };

  const selectedTagsCount = (searchState.selectedTags || []).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="tag-filter" ref={dropdownRef}>
      <button
        className={`btn btn-secondary ${isOpen ? "active" : ""}`}
        onClick={toggleDropdown}
        type="button"
      >
        <Icon name="filter" className="icon" />
        {selectedTagsCount > 0 && (
          <span className="badge">{selectedTagsCount}</span>
        )}
      </button>

      <div className={`tag-filter-dropdown ${isOpen ? "open" : ""}`}>
        {searchState.selectedTags.length > 0 && (
          <div className="clear-filters-footer">
            <button onClick={clearTags} className="btn btn-danger-tertiary btn-sm clear-filters-btn">Clear filters</button>
          </div>
        )}

        <div className="tag-filter-contents">
          {Object.entries(TAG_CATEGORIES).map(([categoryKey, categoryName]) => {
            const category = categoryKey as TagCategory;
            const categoryTags = getTagsByCategory(category);
            const selectedTagInCategory = getCategorySelectedTag(category);
            const isSingleSelectCategory = singleSelectCategories.includes(category);

            return (
              <div key={category} className={`tag-category ${isSingleSelectCategory && selectedTagInCategory ? "has-selection" : ""}`}>
                <h5 className="tag-category-title">{categoryName}</h5>
                <div className="tag-category-items">
                  {categoryTags.map((tag) => {
                    const isSelected = (searchState.selectedTags || []).includes(tag.id);
                    const isInactive = isSingleSelectCategory && selectedTagInCategory && !isSelected;

                    return (
                      <span
                        key={tag.id}
                        className={`tag clickable ${isSelected ? "selected" : ""} ${isInactive ? "inactive" : ""}`}
                        onClick={() => handleTagClick(tag.id)}
                      >
                        {tag.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
