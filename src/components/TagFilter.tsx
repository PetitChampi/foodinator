import React, { useState, useRef, useEffect } from "react";
import { TAG_CATEGORIES, getTagsByCategory, TagCategory, getTagById } from "@/models/tagDefinitions";
import { useFoodinatorStore } from "@/store/useFoodinatorStore";
import { Icon } from "@/components/Icon";

export const TagFilter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { searchState, addTag, removeTag, clearTags } = useFoodinatorStore();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const singleSelectCategories: TagCategory[] = ["cookingMethod", "base", "proteinSource"];

  const handleTagClick = (tagId: string) => {
    const selectedTags = searchState.selectedTags || [];
    const tag = getTagById(tagId);

    if (!tag) return;

    if (selectedTags.includes(tagId)) {
      removeTag(tagId);
    } else {
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

  const getCategorySelectedTag = (category: TagCategory): string | null => {
    const selectedTags = searchState.selectedTags || [];
    const categoryTags = getTagsByCategory(category);
    return selectedTags.find(selectedTagId =>
      categoryTags.some(categoryTag => categoryTag.id === selectedTagId),
    ) || null;
  };

  const selectedTagsCount = (searchState.selectedTags || []).length;

  const calculateMaxHeight = () => {
    if (!buttonRef.current) return;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const tabsElement = document.querySelector(".tabs");

    if (tabsElement) {
      const tabsRect = tabsElement.getBoundingClientRect();
      // Calculate space between button bottom and tabs top, minus some padding
      const availableSpace = tabsRect.top - buttonRect.bottom - 20;
      setMaxHeight(Math.max(200, availableSpace));
    } else {
      // Fallback if tabs not found
      const viewportHeight = window.innerHeight;
      const availableSpace = viewportHeight - buttonRect.bottom - 100;
      setMaxHeight(Math.max(200, availableSpace));
    }
  };

  useEffect(() => {
    if (isOpen) {
      calculateMaxHeight();
      const handleResize = () => calculateMaxHeight();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(calculateMaxHeight, 10);
    }
  }, [searchState.selectedTags, searchState.selectedIngredients, searchState.searchTerm, isOpen]);

  useEffect(() => {
    const initialCalculation = () => {
      setTimeout(calculateMaxHeight, 100);
    };

    initialCalculation();

    const handleResize = () => calculateMaxHeight();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        ref={buttonRef}
        className={`btn btn-tertiary-neutral ${isOpen ? "active" : ""}`}
        onClick={toggleDropdown}
        type="button"
      >
        <Icon name="filter" className="icon" />
        {selectedTagsCount > 0 && (
          <span className="badge">{selectedTagsCount}</span>
        )}
      </button>

      <div
        className={`tag-filter-dropdown ${isOpen ? "open" : ""}`}
        style={{ maxHeight: maxHeight ? `${maxHeight}px` : undefined }}
      >
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
