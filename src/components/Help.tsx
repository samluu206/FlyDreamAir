import { MessageCircle, Phone, Mail, FileText, Search, CreditCard, Plane, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface HelpProps {
  onNewSearch: () => void;
}

export function Help({ onNewSearch }: HelpProps) {
  const faqs = [
    {
      question: "How do I change or cancel my booking?",
      answer: "You can manage your booking by going to 'My Trips' and entering your booking reference and last name. From there, you can change dates, seats, add baggage, or cancel your flight."
    },
    {
      question: "What documents do I need for travel?",
      answer: "You'll need a valid passport for international flights and a government-issued ID for domestic flights. Check visa requirements for your destination country."
    },
    {
      question: "How early should I arrive at the airport?",
      answer: "We recommend arriving 2 hours early for domestic flights and 3 hours early for international flights to allow time for check-in and security screening."
    },
    {
      question: "What's included in my baggage allowance?",
      answer: "Baggage allowances vary by airline and ticket type. Check your booking confirmation for specific details about your carry-on and checked baggage limits."
    },
    {
      question: "Can I select my seat?",
      answer: "Yes! You can select your seat during booking or later by managing your booking in 'My Trips'. Some airlines may charge fees for preferred seating."
    },
    {
      question: "How do I get my boarding pass?",
      answer: "You can check in online 24 hours before departure through our website or the airline's website. Your boarding pass will be available digitally or you can print it."
    }
  ];

  const contactOptions = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Available 24/7 for urgent matters",
      contact: "1-800-FLY-DREAM",
      action: "Call Now"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Response within 24 hours",
      contact: "support@flydreamair.com",
      action: "Send Email"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      contact: "Available 9 AM - 6 PM EST",
      action: "Start Chat"
    }
  ];

  const quickActions = [
    {
      icon: Search,
      title: "Find My Booking",
      description: "Look up your reservation details",
      action: () => {} // This would navigate to My Trips
    },
    {
      icon: Plane,
      title: "Book a Flight",
      description: "Search and book new flights",
      action: onNewSearch
    },
    {
      icon: CreditCard,
      title: "Payment Issues",
      description: "Help with payment and refunds",
      action: () => {}
    },
    {
      icon: Clock,
      title: "Flight Status",
      description: "Check real-time flight information",
      action: () => {}
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="font-bold text-foreground">Help & Support</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get answers to common questions or contact our support team for personalized assistance.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer" onClick={action.action}>
            <CardContent className="p-6 text-center space-y-3">
              <action.icon className="h-8 w-8 text-primary mx-auto" />
              <h3 className="font-medium text-foreground">{action.title}</h3>
              <p className="text-sm text-muted-foreground">{action.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact Options */}
      <div className="space-y-6">
        <h3 className="font-semibold text-foreground text-center">Contact Support</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {contactOptions.map((option, index) => (
            <Card key={index}>
              <CardHeader className="text-center pb-4">
                <option.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">{option.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <p className="font-medium text-foreground">{option.contact}</p>
                <Button variant="outline" className="w-full hover:bg-primary/10">
                  {option.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-6">
        <h3 className="font-semibold text-foreground text-center">Frequently Asked Questions</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-base flex items-start gap-2">
                  <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  {faq.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Book New Flight CTA */}
      <div className="text-center bg-muted/30 rounded-lg p-8">
        <h3 className="font-semibold text-foreground mb-2">Ready to Book Your Next Flight?</h3>
        <p className="text-muted-foreground mb-4">
          Search thousands of flights and find the best deals for your travel needs.
        </p>
        <Button onClick={onNewSearch} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plane className="h-4 w-4 mr-2" />
          Search Flights
        </Button>
      </div>
    </div>
  );
}