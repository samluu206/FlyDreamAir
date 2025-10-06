import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowLeftRight, Calendar as CalendarIcon, Users } from "lucide-react";
// Simple date formatting function instead of date-fns
const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

interface FlightSearchProps {
  onSearch: (searchData: any) => void;
}

export function FlightSearch({ onSearch }: FlightSearchProps) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departDate, setDepartDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [passengers, setPassengers] = useState("1");
  const [tripType, setTripType] = useState("round-trip");

  const handleSwapLocations = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleSearch = () => {
    onSearch({
      from,
      to,
      departDate,
      returnDate: tripType === "round-trip" ? returnDate : null,
      passengers: parseInt(passengers),
      tripType
    });
  };

  const popularCities = [
    "Sydney (SYD)", "Melbourne (MEL)", "Adelaide (ADL)", 
    "Baku (BAK)", "Danang (DAD)", "Hanoi (HAN)"
  ];

  return (
    <Card className="w-full max-w-5xl mx-auto border-0 shadow-2xl bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <CalendarIcon className="h-5 w-5 text-primary" />
            </div>
            Search Flights
          </CardTitle>
          <div className="flex gap-2 p-1 bg-muted/50 rounded-xl">
            <Button
              variant={tripType === "round-trip" ? "default" : "ghost"}
              onClick={() => setTripType("round-trip")}
              className="rounded-lg font-medium"
              size="sm"
            >
              Round Trip
            </Button>
            <Button
              variant={tripType === "one-way" ? "default" : "ghost"}
              onClick={() => setTripType("one-way")}
              className="rounded-lg font-medium"
              size="sm"
            >
              One Way
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
          {/* Route Section with modern design */}
          <div className="lg:col-span-2 space-y-3">
            <Label className="text-sm font-semibold text-foreground/80">Route</Label>
            <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-2xl border border-border/50">
              <div className="flex-1">
                <Select value={from} onValueChange={setFrom}>
                  <SelectTrigger className="border-0 bg-transparent font-medium">
                    <SelectValue placeholder="From where?" />
                  </SelectTrigger>
                  <SelectContent>
                    {popularCities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSwapLocations}
                className="h-8 w-8 rounded-full bg-primary/10 hover:bg-primary/20 hover:rotate-180 transition-all duration-300"
              >
                <ArrowLeftRight className="h-4 w-4 text-primary" />
              </Button>
              
              <div className="flex-1">
                <Select value={to} onValueChange={setTo}>
                  <SelectTrigger className="border-0 bg-transparent font-medium">
                    <SelectValue placeholder="To where?" />
                  </SelectTrigger>
                  <SelectContent>
                    {popularCities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Passengers */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Passengers
            </Label>
            <Select value={passengers} onValueChange={setPassengers}>
              <SelectTrigger className="bg-muted/30 border-border/50 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {num} {num === 1 ? "Passenger" : "Passengers"}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Departure Date */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              Departure
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-muted/30 border-border/50 rounded-xl h-12"
                >
                  <CalendarIcon className="mr-3 h-4 w-4 text-primary" />
                  <div className="flex flex-col items-start">
                    <span className="font-medium">
                      {departDate ? formatDate(departDate) : "Select date"}
                    </span>
                    {!departDate && (
                      <span className="text-xs text-muted-foreground">Choose departure</span>
                    )}
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={departDate}
                  onSelect={setDepartDate}
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Return Date */}
          {tripType === "round-trip" && (
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Return
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-muted/30 border-border/50 rounded-xl h-12"
                  >
                    <CalendarIcon className="mr-3 h-4 w-4 text-primary" />
                    <div className="flex flex-col items-start">
                      <span className="font-medium">
                        {returnDate ? formatDate(returnDate) : "Select date"}
                      </span>
                      {!returnDate && (
                        <span className="text-xs text-muted-foreground">Choose return</span>
                      )}
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={returnDate}
                    onSelect={setReturnDate}
                    disabled={(date) => date < (departDate || new Date())}
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>

        <div className="pt-4">
          <Button
            onClick={handleSearch}
            size="lg"
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl"
            disabled={!from || !to || !departDate || (tripType === "round-trip" && !returnDate)}
          >
            <div className="flex items-center gap-3">
              <CalendarIcon className="h-5 w-5" />
              Search Flights
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}