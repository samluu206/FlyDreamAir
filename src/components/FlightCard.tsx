import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Plane, Clock, Wifi, Coffee, Tv } from "lucide-react";

interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  from: string;
  to: string;
  departTime: string;
  arriveTime: string;
  duration: string;
  price: number;
  stops: number;
  aircraft: string;
  amenities: string[];
}

interface FlightCardProps {
  flight: Flight;
  onSelect: (flight: Flight) => void;
}

export function FlightCard({ flight, onSelect }: FlightCardProps) {
  const getAirlineLogo = (airline: string) => {
    // In a real app, you'd have actual airline logos
    const colors = {
      "American Airlines": "bg-red-600",
      "Delta Air Lines": "bg-blue-600", 
      "United Airlines": "bg-blue-800",
      "Southwest Airlines": "bg-orange-600",
      "JetBlue Airways": "bg-blue-500"
    };
    return colors[airline as keyof typeof colors] || "bg-gray-600";
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "WiFi": return <Wifi className="h-4 w-4" />;
      case "Meals": return <Coffee className="h-4 w-4" />;
      case "Entertainment": return <Tv className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Airline Logo */}
            <div className={`w-12 h-12 rounded-full ${getAirlineLogo(flight.airline)} flex items-center justify-center`}>
              <Plane className="h-6 w-6 text-white" />
            </div>
            
            <div>
              <h3 className="font-semibold text-card-foreground">{flight.airline}</h3>
              <p className="text-sm text-muted-foreground">{flight.flightNumber} • {flight.aircraft}</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-2xl font-bold text-green-500">${flight.price}</p>
            <p className="text-sm text-muted-foreground">per person</p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            {/* Departure */}
            <div className="text-center">
              <p className="text-xl font-semibold text-card-foreground">{flight.departTime}</p>
              <p className="text-sm text-muted-foreground">{flight.from}</p>
            </div>

            {/* Flight Duration */}
            <div className="flex flex-col items-center">
              <div className="flex items-center text-muted-foreground">
                <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                <div className="w-16 h-px bg-border mx-2 relative">
                  <Plane className="h-4 w-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
              </div>
              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                {flight.duration}
              </div>
              {flight.stops > 0 && (
                <Badge variant="secondary" className="mt-1 text-xs">
                  {flight.stops} stop{flight.stops > 1 ? 's' : ''}
                </Badge>
              )}
            </div>

            {/* Arrival */}
            <div className="text-center">
              <p className="text-xl font-semibold text-card-foreground">{flight.arriveTime}</p>
              <p className="text-sm text-muted-foreground">{flight.to}</p>
            </div>
          </div>
        </div>

        {/* Amenities */}
        {flight.amenities.length > 0 && (
          <div className="mt-4 flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Amenities:</span>
            <div className="flex items-center space-x-2">
              {flight.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center space-x-1 text-sm text-muted-foreground">
                  {getAmenityIcon(amenity)}
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <Button onClick={() => onSelect(flight)}>
            Select Flight
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}