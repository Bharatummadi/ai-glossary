
import React, { useState, useMemo } from 'react';
import { Search, Brain, Cpu, BookOpen, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AITerm {
  term: string;
  definition: string;
  category: string;
  example?: string;
}

const categories = [
  { name: "All", icon: BookOpen, color: "bg-blue-500" },
  { name: "Machine Learning", icon: Brain, color: "bg-purple-500" },
  { name: "Deep Learning", icon: Cpu, color: "bg-green-500" },
  { name: "NLP", icon: Zap, color: "bg-orange-500" },
  { name: "Computer Vision", icon: Brain, color: "bg-red-500" },
  { name: "General AI", icon: BookOpen, color: "bg-indigo-500" }
];

const aiTerms: AITerm[] = [
  {
    term: "Artificial Intelligence",
    definition: "The simulation of human intelligence in machines that are programmed to think and learn like humans.",
    category: "General AI",
    example: "Chatbots, recommendation systems, autonomous vehicles"
  },
  {
    term: "Machine Learning",
    definition: "A subset of AI that enables computers to learn and improve from experience without being explicitly programmed.",
    category: "Machine Learning",
    example: "Email spam detection, product recommendations"
  },
  {
    term: "Deep Learning",
    definition: "A subset of machine learning that uses neural networks with multiple layers to analyze data.",
    category: "Deep Learning",
    example: "Image recognition, speech recognition, language translation"
  },
  {
    term: "Neural Network",
    definition: "A computing system inspired by biological neural networks, consisting of interconnected nodes (neurons).",
    category: "Deep Learning",
    example: "Feedforward networks, convolutional networks, recurrent networks"
  },
  {
    term: "Natural Language Processing",
    definition: "A branch of AI that helps computers understand, interpret, and manipulate human language.",
    category: "NLP",
    example: "Chatbots, language translation, sentiment analysis"
  },
  {
    term: "Computer Vision",
    definition: "A field of AI that trains computers to interpret and understand visual information from images and videos.",
    category: "Computer Vision",
    example: "Face recognition, medical image analysis, autonomous driving"
  },
  {
    term: "Algorithm",
    definition: "A set of rules or instructions given to an AI system to help it learn on its own.",
    category: "Machine Learning",
    example: "Linear regression, decision trees, k-means clustering"
  },
  {
    term: "Supervised Learning",
    definition: "A type of machine learning where the algorithm learns from labeled training data.",
    category: "Machine Learning",
    example: "Email classification, price prediction, medical diagnosis"
  },
  {
    term: "Unsupervised Learning",
    definition: "A type of machine learning where the algorithm finds patterns in data without labeled examples.",
    category: "Machine Learning",
    example: "Customer segmentation, anomaly detection, data compression"
  },
  {
    term: "Reinforcement Learning",
    definition: "A type of machine learning where an agent learns to make decisions by taking actions and receiving rewards.",
    category: "Machine Learning",
    example: "Game playing AI, robotics, autonomous systems"
  },
  {
    term: "Convolutional Neural Network",
    definition: "A type of deep neural network particularly effective for analyzing visual imagery.",
    category: "Deep Learning",
    example: "Image classification, object detection, medical imaging"
  },
  {
    term: "Transformer",
    definition: "A neural network architecture that uses attention mechanisms to process sequential data efficiently.",
    category: "NLP",
    example: "GPT models, BERT, language translation systems"
  },
  {
    term: "Large Language Model",
    definition: "AI models trained on vast amounts of text data to understand and generate human-like text.",
    category: "NLP",
    example: "GPT-4, Claude, ChatGPT, PaLM"
  },
  {
    term: "Generative AI",
    definition: "AI systems that can create new content, including text, images, audio, and video.",
    category: "General AI",
    example: "DALL-E, Midjourney, ChatGPT, Stable Diffusion"
  },
  {
    term: "Artificial General Intelligence",
    definition: "A theoretical form of AI that matches or exceeds human cognitive abilities across all domains.",
    category: "General AI",
    example: "Currently theoretical - no existing AGI systems"
  },
  {
    term: "Bias",
    definition: "Systematic errors in AI systems that can lead to unfair or discriminatory outcomes.",
    category: "General AI",
    example: "Gender bias in hiring algorithms, racial bias in facial recognition"
  },
  {
    term: "Training Data",
    definition: "The dataset used to teach a machine learning model to make predictions or decisions.",
    category: "Machine Learning",
    example: "Images for vision models, text for language models, historical data for predictions"
  },
  {
    term: "Overfitting",
    definition: "When a model learns the training data too well and fails to generalize to new, unseen data.",
    category: "Machine Learning",
    example: "A model that memorizes specific examples rather than learning patterns"
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTerms = useMemo(() => {
    return aiTerms.filter(term => {
      const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           term.definition.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || term.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const getCategoryColor = (category: string) => {
    const categoryObj = categories.find(cat => cat.name === category);
    return categoryObj?.color || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI Words Unlocked</h1>
              <p className="text-gray-600">Your comprehensive guide to artificial intelligence terminology</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search AI terms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                    selectedCategory === category.name
                      ? `${category.color} text-white shadow-lg`
                      : 'bg-white text-gray-700 hover:bg-gray-50 border'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-center text-gray-600">
            Showing <span className="font-semibold">{filteredTerms.length}</span> terms
            {selectedCategory !== 'All' && (
              <span> in <span className="font-semibold">{selectedCategory}</span></span>
            )}
          </p>
        </div>

        {/* Terms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTerms.map((term, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 bg-white border-0 shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl font-bold text-gray-900 leading-tight">
                    {term.term}
                  </CardTitle>
                  <Badge 
                    variant="secondary"
                    className={`${getCategoryColor(term.category)} text-white text-xs px-2 py-1 ml-2 flex-shrink-0`}
                  >
                    {term.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-gray-700 text-base leading-relaxed mb-4">
                  {term.definition}
                </CardDescription>
                {term.example && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-600 mb-1">Examples:</p>
                    <p className="text-sm text-gray-700">{term.example}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredTerms.length === 0 && (
          <div className="text-center py-12">
            <Brain className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No terms found</h3>
            <p className="text-gray-600">Try adjusting your search or selecting a different category.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              © 2024 AI Words Unlocked. Empowering understanding of artificial intelligence.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
