
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// This would typically come from a database or API
const termData = {
  "artificial-intelligence": {
    term: "Artificial Intelligence",
    definition: "The simulation of human intelligence in machines that are programmed to think and learn like humans. AI systems can perform tasks that typically require human intelligence, such as visual perception, speech recognition, decision-making, and language translation.",
    example: "Chatbots, recommendation systems, autonomous vehicles, virtual assistants like Siri and Alexa.",
    fullDescription: "Artificial Intelligence represents a broad field of computer science focused on creating systems capable of performing tasks that would normally require human intelligence. This includes learning from experience, understanding natural language, recognizing patterns, solving problems, and making decisions. AI can be categorized into narrow AI (designed for specific tasks) and general AI (theoretical human-level intelligence across all domains). The field encompasses various approaches including machine learning, deep learning, natural language processing, computer vision, and robotics. Modern AI systems are increasingly integrated into daily life through smartphones, search engines, social media platforms, and smart home devices."
  },
  "machine-learning": {
    term: "Machine Learning",
    definition: "A subset of AI that enables computers to learn and improve from experience without being explicitly programmed. ML systems identify patterns in data and make predictions or decisions based on that learning.",
    example: "Email spam detection, product recommendations, medical diagnosis, financial fraud detection.",
    fullDescription: "Machine Learning is a method of data analysis that automates analytical model building. It uses algorithms that iteratively learn from data, allowing computers to find hidden insights and make predictions without being explicitly programmed for specific tasks. There are three main types of machine learning: supervised learning (learning with labeled data), unsupervised learning (finding patterns in unlabeled data), and reinforcement learning (learning through interaction with an environment). Applications span across industries including healthcare, finance, transportation, and entertainment."
  }
  // Add more terms as needed
};

const TermDetail = () => {
  const { id } = useParams<{ id: string }>();
  const term = id ? termData[id as keyof typeof termData] : null;
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
