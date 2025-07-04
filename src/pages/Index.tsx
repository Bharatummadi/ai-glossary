
import React, { useState, useMemo } from 'react';
import { Search, Moon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Link } from 'react-router-dom';

interface AITerm {
  id: string;
  term: string;
  definition: string;
  example?: string;
  fullDescription?: string;
}

const aiTerms: AITerm[] = [
  {
    id: "artificial-intelligence",
    term: "Artificial Intelligence",
    definition: "The simulation of human intelligence in machines that are programmed to think and learn like humans. AI systems can perform tasks that typically require human intelligence, such as visual perception, speech recognition, decision-making, and language translation.",
    example: "Chatbots, recommendation systems, autonomous vehicles, virtual assistants like Siri and Alexa.",
    fullDescription: "Artificial Intelligence represents a broad field of computer science focused on creating systems capable of performing tasks that would normally require human intelligence. This includes learning from experience, understanding natural language, recognizing patterns, solving problems, and making decisions. AI can be categorized into narrow AI (designed for specific tasks) and general AI (theoretical human-level intelligence across all domains)."
  },
  {
    id: "algorithm",
    term: "Algorithm",
    definition: "A set of rules or instructions given to an AI system to help it learn on its own. Algorithms are step-by-step procedures for solving problems or completing tasks, forming the foundation of all AI and machine learning systems.",
    example: "Linear regression, decision trees, k-means clustering, neural network training algorithms.",
    fullDescription: "An algorithm is a finite sequence of well-defined instructions for solving a problem or performing a computation. In AI and machine learning, algorithms are used to process data, identify patterns, make predictions, and learn from experience. They can range from simple rule-based systems to complex deep learning architectures."
  },
  {
    id: "bias",
    term: "Bias",
    definition: "Systematic errors in AI systems that can lead to unfair or discriminatory outcomes. Bias can be introduced through training data, algorithm design, or human assumptions built into the system.",
    example: "Gender bias in hiring algorithms, racial bias in facial recognition systems, age bias in loan approval systems.",
    fullDescription: "AI bias refers to systematic and unfair discrimination in AI systems that can perpetuate or amplify existing societal inequalities. This can occur through biased training data, algorithmic design choices, or the way systems are deployed and used. Addressing bias is crucial for developing fair and ethical AI systems."
  },
  {
    id: "computer-vision",
    term: "Computer Vision",
    definition: "A field of AI that trains computers to interpret and understand visual information from images and videos. It enables machines to identify objects, people, text, and scenes in visual content.",
    example: "Face recognition, medical image analysis, autonomous driving, quality control in manufacturing.",
    fullDescription: "Computer vision combines machine learning, image processing, and pattern recognition to enable computers to extract meaningful information from visual data. Applications range from simple image classification to complex scene understanding and real-time object tracking."
  },
  {
    id: "convolutional-neural-network",
    term: "Convolutional Neural Network",
    definition: "A type of deep neural network particularly effective for analyzing visual imagery. CNNs use mathematical operations called convolutions to detect features like edges, shapes, and patterns in images.",
    example: "Image classification, object detection, medical imaging, facial recognition systems.",
    fullDescription: "Convolutional Neural Networks (CNNs) are specialized neural networks designed for processing grid-like data such as images. They use convolutional layers that apply filters to detect local features, pooling layers to reduce dimensionality, and fully connected layers for final classification or regression tasks."
  },
  {
    id: "deep-learning",
    term: "Deep Learning",
    definition: "A subset of machine learning that uses neural networks with multiple layers to analyze data. These deep networks can automatically learn complex patterns and representations from large amounts of data.",
    example: "Image recognition, speech recognition, language translation, game playing AI like AlphaGo.",
    fullDescription: "Deep learning uses artificial neural networks with multiple layers (hence 'deep') to model and understand complex patterns in data. Each layer learns increasingly abstract representations, allowing the system to handle complex tasks like image recognition, natural language processing, and decision making."
  },
  {
    id: "generative-ai",
    term: "Generative AI",
    definition: "AI systems that can create new content, including text, images, audio, and video. These systems learn patterns from training data and use that knowledge to generate novel, realistic content.",
    example: "ChatGPT for text generation, DALL-E for image creation, Midjourney for art, GitHub Copilot for code.",
    fullDescription: "Generative AI refers to artificial intelligence systems capable of creating new content that resembles human-created work. These systems are trained on large datasets and learn to generate new examples that follow the patterns and styles of the training data, enabling applications in creative fields, content creation, and automated assistance."
  },
  {
    id: "large-language-model",
    term: "Large Language Model",
    definition: "AI models trained on vast amounts of text data to understand and generate human-like text. LLMs can perform various language tasks including translation, summarization, and conversation.",
    example: "GPT-4, Claude, ChatGPT, PaLM, BERT for understanding context and generating responses.",
    fullDescription: "Large Language Models are transformer-based neural networks trained on enormous text datasets to understand and generate human language. They learn statistical patterns in language that allow them to predict the next word in a sequence, enabling capabilities like text completion, question answering, and creative writing."
  },
  {
    id: "machine-learning",
    term: "Machine Learning",
    definition: "A subset of AI that enables computers to learn and improve from experience without being explicitly programmed. ML systems identify patterns in data and make predictions or decisions based on that learning.",
    example: "Email spam detection, product recommendations, medical diagnosis, financial fraud detection.",
    fullDescription: "Machine Learning is a method of data analysis that automates analytical model building. It uses algorithms that iteratively learn from data, allowing computers to find hidden insights and make predictions without being explicitly programmed for specific tasks."
  },
  {
    id: "natural-language-processing",
    term: "Natural Language Processing",
    definition: "A branch of AI that helps computers understand, interpret, and manipulate human language. NLP bridges the gap between human communication and computer understanding.",
    example: "Chatbots, language translation, sentiment analysis, voice assistants, text summarization.",
    fullDescription: "Natural Language Processing combines computational linguistics with machine learning and deep learning to help computers process and analyze large amounts of natural language data. It enables computers to understand text and spoken words in much the same way human beings do."
  },
  {
    id: "neural-network",
    term: "Neural Network",
    definition: "A computing system inspired by biological neural networks, consisting of interconnected nodes (neurons) that process and transmit information. These networks can learn complex patterns through training.",
    example: "Feedforward networks for classification, convolutional networks for images, recurrent networks for sequences.",
    fullDescription: "Neural networks are computing systems vaguely inspired by the biological neural networks that constitute animal brains. They consist of layers of interconnected nodes (artificial neurons) that can learn to recognize patterns, classify data, and make predictions through a process called training."
  },
  {
    id: "overfitting",
    term: "Overfitting",
    definition: "When a model learns the training data too well and fails to generalize to new, unseen data. The model becomes too specialized to the training examples and performs poorly on real-world data.",
    example: "A model that memorizes specific examples rather than learning general patterns, leading to poor performance on new data.",
    fullDescription: "Overfitting occurs when a machine learning model becomes too complex relative to the amount and noise level of the training data. The model essentially memorizes the training data rather than learning generalizable patterns, resulting in excellent performance on training data but poor performance on new, unseen data."
  },
  {
    id: "reinforcement-learning",
    term: "Reinforcement Learning",
    definition: "A type of machine learning where an agent learns to make decisions by taking actions and receiving rewards or penalties. The agent learns optimal behavior through trial and error interactions with an environment.",
    example: "Game playing AI, robotics, autonomous systems, recommendation systems, trading algorithms.",
    fullDescription: "Reinforcement Learning is an area of machine learning concerned with how software agents ought to take actions in an environment to maximize cumulative reward. The agent learns through interaction with the environment, receiving feedback in the form of rewards or penalties."
  },
  {
    id: "supervised-learning",
    term: "Supervised Learning",
    definition: "A type of machine learning where the algorithm learns from labeled training data. The system learns to map inputs to correct outputs using examples of input-output pairs.",
    example: "Email classification, price prediction, medical diagnosis, image recognition with labeled datasets.",
    fullDescription: "Supervised learning uses labeled training data to learn a mapping function from input variables to output variables. The goal is to approximate the mapping function so well that when you have new input data, you can predict the output variables for that data."
  },
  {
    id: "training-data",
    term: "Training Data",
    definition: "The dataset used to teach a machine learning model to make predictions or decisions. This data contains examples that the model learns from to identify patterns and relationships.",
    example: "Images for vision models, text for language models, historical sales data for prediction models.",
    fullDescription: "Training data is the initial dataset used to teach machine learning algorithms. It consists of input-output pairs in supervised learning, or just inputs in unsupervised learning. The quality and quantity of training data significantly impacts the performance of the resulting model."
  },
  {
    id: "transformer",
    term: "Transformer",
    definition: "A neural network architecture that uses attention mechanisms to process sequential data efficiently. Transformers have revolutionized natural language processing and form the basis of modern language models.",
    example: "GPT models, BERT, language translation systems, text summarization tools.",
    fullDescription: "The Transformer is a deep learning model introduced in 2017 that has become the foundation for most modern language models. It uses self-attention mechanisms to process sequences of data in parallel, making it much more efficient than previous sequential models for many tasks."
  },
  {
    id: "unsupervised-learning",
    term: "Unsupervised Learning",
    definition: "A type of machine learning where the algorithm finds patterns in data without labeled examples. The system discovers hidden structures in data without being told what to look for.",
    example: "Customer segmentation, anomaly detection, data compression, market basket analysis.",
    fullDescription: "Unsupervised learning is a type of machine learning that looks for previously undetected patterns in a dataset with no pre-existing labels. It explores data to find structure without any explicit instruction on what to find, making it useful for exploratory data analysis."
  }
];

const ITEMS_PER_PAGE = 12;
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTerms = useMemo(() => {
    let filtered = aiTerms;
    
    if (searchTerm) {
      filtered = filtered.filter(term => 
        term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedLetter) {
      filtered = filtered.filter(term => 
        term.term.charAt(0).toUpperCase() === selectedLetter
      );
    }
    
    return filtered.sort((a, b) => a.term.localeCompare(b.term));
  }, [searchTerm, selectedLetter]);

  const totalPages = Math.ceil(filteredTerms.length / ITEMS_PER_PAGE);
  const paginatedTerms = filteredTerms.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleLetterClick = (letter: string) => {
    setSelectedLetter(selectedLetter === letter ? '' : letter);
    setCurrentPage(1);
    setSearchTerm('');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSelectedLetter('');
    setCurrentPage(1);
  };

  const truncateText = (text: string, lines: number = 5) => {
    const words = text.split(' ');
    const wordsPerLine = 12; // Approximate words per line
    const maxWords = lines * wordsPerLine;
    
    if (words.length <= maxWords) return text;
    
    return words.slice(0, maxWords).join(' ') + '...';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">AI Glossary</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search terms..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10 pr-4 w-80 border-gray-200 focus:border-gray-300 focus:ring-gray-300"
                />
              </div>
              <Button variant="ghost" size="icon" className="text-gray-500">
                <Moon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-light text-gray-900 mb-4 leading-tight">
            Making AI terms <span className="font-medium">less intimidating</span>,<br />
            one word at a time.
          </h2>
          
          {/* Large Search Bar */}
          <div className="max-w-2xl mx-auto mt-8 mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for AI terms..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-12 pr-4 py-4 text-lg border-gray-200 focus:border-gray-300 focus:ring-gray-300 rounded-lg"
              />
              <Button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-600 hover:bg-gray-700"
                size="sm"
              >
                Search
              </Button>
            </div>
          </div>

          {/* Alphabet Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {alphabet.map((letter) => {
              const hasTerms = aiTerms.some(term => 
                term.term.charAt(0).toUpperCase() === letter
              );
              return (
                <button
                  key={letter}
                  onClick={() => handleLetterClick(letter)}
                  className={`px-3 py-2 text-sm font-medium rounded transition-colors ${
                    selectedLetter === letter
                      ? 'bg-gray-900 text-white'
                      : hasTerms
                      ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      : 'text-gray-300 cursor-not-allowed'
                  }`}
                  disabled={!hasTerms}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        {(searchTerm || selectedLetter) && (
          <div className="mb-6">
            <p className="text-gray-600 text-center">
              {filteredTerms.length} {filteredTerms.length === 1 ? 'term' : 'terms'} found
              {selectedLetter && ` starting with "${selectedLetter}"`}
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>
        )}

        {/* Terms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {paginatedTerms.map((term) => (
            <Card key={term.id} className="border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200 bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900 leading-tight">
                  {term.term}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {truncateText(term.definition)}
                </p>
                <Link 
                  to={`/term/${term.id}`}
                  className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors"
                >
                  Read more →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className="mb-8">
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="cursor-pointer"
                  />
                </PaginationItem>
              )}
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="cursor-pointer"
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        )}

        {/* No Results */}
        {filteredTerms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500 mb-2">No terms found</p>
            <p className="text-gray-400">Try searching for a different term or select a different letter.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm text-gray-500">
              © 2024 AI Glossary. Making AI terminology accessible.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
