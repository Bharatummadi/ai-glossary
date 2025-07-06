
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

const TermDetail = () => {
  const { id } = useParams<{ id: string }>();
  const term = aiTerms.find(t => t.id === id);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  if (!term) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <header className="border-b border-border bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="text-2xl font-semibold text-foreground">AI Glossary</Link>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="text-muted-foreground hover:text-foreground"
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-foreground mb-4">Term not found</h1>
            <p className="text-muted-foreground mb-8">The term you're looking for doesn't exist or has been moved.</p>
            <Link to="/">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Glossary
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-semibold text-foreground">AI Glossary</Link>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="text-muted-foreground hover:text-foreground"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground -ml-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Glossary
            </Button>
          </Link>
        </div>

        {/* Term Detail Card */}
        <Card className="border border-border bg-card">
          <CardHeader className="pb-6">
            <CardTitle className="text-3xl font-semibold text-card-foreground">
              {term.term}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-card-foreground mb-3">Definition</h3>
              <p className="text-muted-foreground leading-relaxed">{term.definition}</p>
            </div>

            {term.fullDescription && (
              <div>
                <h3 className="text-lg font-medium text-card-foreground mb-3">Detailed Explanation</h3>
                <p className="text-muted-foreground leading-relaxed">{term.fullDescription}</p>
              </div>
            )}

            {term.example && (
              <div>
                <h3 className="text-lg font-medium text-card-foreground mb-3">Examples</h3>
                <p className="text-muted-foreground leading-relaxed">{term.example}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 AI Glossary. Making AI terminology accessible.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TermDetail;
