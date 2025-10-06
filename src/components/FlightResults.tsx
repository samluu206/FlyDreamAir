import { useState } from "react";
import { FlightCard } from "./FlightCard";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Filter, SlidersHorizontal } from "lucide-react";

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

interface FlightResultsProps {
  searchData: any;
  onSelectFlight: (flight: Flight) => void;
}

export function FlightResults({ searchData, onSelectFlight }: FlightResultsProps) {
  const [sortBy, setSortBy] = useState("price");
  const [filterStops, setFilterStops] = useState("all");
  const [selectedOutboundFlight, setSelectedOutboundFlight] = useState<Flight | null>(null);
  const [currentView, setCurrentView] = useState<'outbound' | 'return'>('outbound');

  // Helper function to check if the search matches our specific flights
  const getAvailableFlights = (isReturn = false) => {
    const from = isReturn ? searchData.to?.split(" ")[0] : searchData.from?.split(" ")[0];
    const to = isReturn ? searchData.from?.split(" ")[0] : searchData.to?.split(" ")[0];
    const targetDate = isReturn ? searchData.returnDate : searchData.departDate;

    if (!targetDate) return [];

    // Format date to DD/MM/YYYY for comparison
    const searchDateString = `${targetDate.getDate()}/${targetDate.getMonth() + 1}/${targetDate.getFullYear()}`;
    
    // Sydney -> Danang: 19/11/2025
    if (from === "Sydney" && to === "Danang" && searchDateString === "19/11/2025") {
      return [
        {
          id: "syd-dad-1",
          airline: "Vietnam Airlines",
          flightNumber: "VN 773",
          from: "Sydney",
          to: "Danang",
          departTime: "10:30 AM",
          arriveTime: "4:15 PM",
          duration: "8h 45m",
          price: 850,
          stops: 1,
          aircraft: "Airbus A350",
          amenities: ["WiFi", "Entertainment", "Meals", "Lounge Access"]
        },
        {
          id: "syd-dad-2",
          airline: "Jetstar Airways",
          flightNumber: "JQ 507",
          from: "Sydney",
          to: "Danang",
          departTime: "2:20 PM",
          arriveTime: "8:05 PM",
          duration: "8h 45m",
          price: 650,
          stops: 1,
          aircraft: "Airbus A321",
          amenities: ["WiFi", "Meals"]
        }
      ];
    }
    
    // Danang -> Sydney: 28/2/2026
    if (from === "Danang" && to === "Sydney" && searchDateString === "28/2/2026") {
      return [
        {
          id: "dad-syd-1",
          airline: "Vietnam Airlines", 
          flightNumber: "VN 774",
          from: "Danang",
          to: "Sydney",
          departTime: "11:45 PM",
          arriveTime: "12:30 PM+1",
          duration: "9h 45m",
          price: 920,
          stops: 1,
          aircraft: "Airbus A350",
          amenities: ["WiFi", "Entertainment", "Meals", "Lounge Access"]
        },
        {
          id: "dad-syd-2",
          airline: "Jetstar Airways",
          flightNumber: "JQ 508",
          from: "Danang", 
          to: "Sydney",
          departTime: "6:30 PM",
          arriveTime: "7:15 AM+1",
          duration: "9h 45m",
          price: 720,
          stops: 1,
          aircraft: "Airbus A321",
          amenities: ["WiFi", "Meals"]
        }
      ];
    }

    // No flights for other routes/dates
    return [];
  };

  const mockFlights: Flight[] = getAvailableFlights(currentView === 'return');

  const handleFlightSelect = (flight: Flight) => {
    if (searchData.tripType === 'round-trip' && currentView === 'outbound') {
      setSelectedOutboundFlight(flight);
      setCurrentView('return');
    } else if (searchData.tripType === 'round-trip' && currentView === 'return') {
      // Pass both flights for round trip booking
      onSelectFlight({
        outbound: selectedOutboundFlight,
        return: flight,
        isRoundTrip: true
      });
    } else {
      // One way flight
      onSelectFlight(flight);
    }
  };

  const filteredAndSortedFlights = mockFlights
    .filter(flight => {
      if (filterStops === "direct") return flight.stops === 0;
      if (filterStops === "1-stop") return flight.stops === 1;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.price - b.price;
        case "duration":
          return parseFloat(a.duration) - parseFloat(b.duration);
        case "departure":
          return a.departTime.localeCompare(b.departTime);
        default:
          return 0;
      }
    });

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Search Summary */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>
                {currentView === 'outbound' 
                  ? `${searchData.from} → ${searchData.to}`
                  : `${searchData.to} → ${searchData.from}`}
              </CardTitle>
              <p className="text-muted-foreground">
                {currentView === 'outbound' 
                  ? searchData.departDate?.toDateString()
                  : searchData.returnDate?.toDateString()} • {searchData.passengers} passenger{searchData.passengers > 1 ? 's' : ''}
              </p>
              {searchData.tripType === 'round-trip' && (
                <p className="text-primary mt-1">
                  {currentView === 'outbound' ? 'Step 1: Select outbound flight' : 'Step 2: Select return flight'}
                </p>
              )}
            </div>
            {searchData.tripType === 'round-trip' && selectedOutboundFlight && currentView === 'return' && (
              <div className="text-right">
                <p className="font-medium">Selected Outbound:</p>
                <p className="text-muted-foreground">
                  {selectedOutboundFlight.airline} {selectedOutboundFlight.flightNumber}
                </p>
                <p className="text-muted-foreground">${selectedOutboundFlight.price}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    setCurrentView('outbound');
                    setSelectedOutboundFlight(null);
                  }}
                  className="mt-2"
                >
                  Change Outbound
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Filters and Sort */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span className="text-sm font-medium">Stops:</span>
                <Select value={filterStops} onValueChange={setFilterStops}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="direct">Direct</SelectItem>
                    <SelectItem value="1-stop">1 Stop</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="text-sm font-medium">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                  <SelectItem value="departure">Departure</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Found {filteredAndSortedFlights.length} flights
      </div>

      {/* Flight Results */}
      <div className="space-y-4">
        {filteredAndSortedFlights.map((flight) => (
          <FlightCard
            key={flight.id}
            flight={flight}
            onSelect={handleFlightSelect}
          />
        ))}
      </div>

      {filteredAndSortedFlights.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No flights available for this route and date.</p>
            <p className="text-muted-foreground text-sm mt-2">
              Available flights:
              <br />• Sydney → Danang: November 19, 2025
              <br />• Danang → Sydney: February 28, 2026
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}