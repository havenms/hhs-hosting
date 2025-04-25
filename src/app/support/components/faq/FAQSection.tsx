import { useState } from "react";
import { FAQCategoryList } from "./FAQCategoryList";
import { FAQSearchResults } from "./FAQSearchResults";
import { faqs } from "../../data/faqs";

interface FAQSectionProps {
  onTabChange: (tab: string) => void;
}

export function FAQSection({ onTabChange }: FAQSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter FAQs based on search query and category
  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className='space-y-8'>
      <div className='grid md:grid-cols-4 gap-6'>
        <div className='md:col-span-1 space-y-6'>
          <FAQCategoryList 
            selectedCategory={selectedCategory} 
            onSelectCategory={setSelectedCategory} 
          />
        </div>

        <div className='md:col-span-3'>
          <FAQSearchResults 
            faqs={filteredFaqs}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onTabChange={onTabChange}
          />
        </div>
      </div>
    </div>
  );
}