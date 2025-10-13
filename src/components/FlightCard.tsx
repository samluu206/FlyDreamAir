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
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Airline Logo */}
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${getAirlineLogo(flight.airline)} flex items-center justify-center flex-shrink-0`}>
              <Plane className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-card-foreground text-sm sm:text-base truncate">{flight.airline}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">{flight.flightNumber} • {flight.aircraft}</p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-xl sm:text-2xl font-bold text-green-500">${flight.price}</p>
            <p className="text-xs sm:text-sm text-muted-foreground">per person</p>
          </div>
        </div>

        <div className="mt-4 sm:mt-6">
          <div className="flex items-center justify-between gap-2 sm:gap-8">
            {/* Departure */}
            <div className="text-center flex-1">
              <p className="text-base sm:text-xl font-semibold text-card-foreground">{flight.departTime}</p>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">{flight.from}</p>
            </div>

            {/* Flight Duration */}
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="flex items-center text-muted-foreground">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-muted-foreground rounded-full"></div>
                <div className="w-12 sm:w-16 h-px bg-border mx-1 sm:mx-2 relative">
                  <Plane className="h-3 w-3 sm:h-4 sm:w-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-muted-foreground rounded-full"></div>
              </div>
              <div className="flex items-center mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                {flight.duration}
              </div>
              {flight.stops > 0 && (
                <Badge variant="secondary" className="mt-1 text-xs">
                  {flight.stops} stop{flight.stops > 1 ? 's' : ''}
                </Badge>
              )}
            </div>

            {/* Arrival */}
            <div className="text-center flex-1">
              <p className="text-base sm:text-xl font-semibold text-card-foreground">{flight.arriveTime}</p>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">{flight.to}</p>
            </div>
          </div>
        </div>

        {/* Amenities */}
        {flight.amenities.length > 0 && (
          <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <span className="text-xs sm:text-sm text-muted-foreground font-medium">Amenities:</span>
            <div className="flex items-center flex-wrap gap-2 sm:gap-3">
              {flight.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                  {getAmenityIcon(amenity)}
                  <span className="hidden sm:inline">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 sm:mt-6 flex justify-end">
          <Button onClick={() => onSelect(flight)} className="w-full sm:w-auto">
            Select Flight
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}