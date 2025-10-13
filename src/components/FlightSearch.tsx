import { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowLeftRight, Calendar as CalendarIcon, Users } from "lucide-react";

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
      <CardHeader className="pb-6 sm:pb-8 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-xl sm:text-2xl font-bold flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg">
              <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            Search Flights
          </CardTitle>
          <div className="flex gap-2 p-1 bg-muted/50 rounded-xl w-full sm:w-auto">
            <Button
              variant={tripType === "round-trip" ? "default" : "ghost"}
              onClick={() => setTripType("round-trip")}
              className="rounded-lg font-medium flex-1 sm:flex-none text-sm sm:text-base"
              size="sm"
            >
              Round Trip
            </Button>
            <Button
              variant={tripType === "one-way" ? "default" : "ghost"}
              onClick={() => setTripType("one-way")}
              className="rounded-lg font-medium flex-1 sm:flex-none text-sm sm:text-base"
              size="sm"
            >
              One Way
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 sm:space-y-8 px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 items-end">
          {/* Route Section with modern design */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-3">
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
                  <CalendarIcon className="mr-2 sm:mr-3 h-4 w-4 text-primary flex-shrink-0" />
                  <div className="flex flex-col items-start overflow-hidden">
                    <span className="font-medium text-sm sm:text-base truncate w-full">
                      {departDate ? formatDate(departDate) : "Select date"}
                    </span>
                    {!departDate && (
                      <span className="text-xs text-muted-foreground hidden sm:block">Choose departure</span>
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
                    <CalendarIcon className="mr-2 sm:mr-3 h-4 w-4 text-primary flex-shrink-0" />
                    <div className="flex flex-col items-start overflow-hidden">
                      <span className="font-medium text-sm sm:text-base truncate w-full">
                        {returnDate ? formatDate(returnDate) : "Select date"}
                      </span>
                      {!returnDate && (
                        <span className="text-xs text-muted-foreground hidden sm:block">Choose return</span>
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

        <div className="pt-2 sm:pt-4">
          <Button
            onClick={handleSearch}
            size="lg"
            className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl"
            disabled={!from || !to || !departDate || (tripType === "round-trip" && !returnDate)}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              Search Flights
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}