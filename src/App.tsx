import { useState } from "react";
import "./styles/globals.css";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

type AnyObj = any;

const FlightSearch: React.FC<{ onSearch: (data: AnyObj) => void }> = () => {
  return <div className="rounded-2xl border p-6">FlightSearch (stub)</div>;
};

const FlightResults: React.FC<{
  searchData: AnyObj;
  onSelectFlight: (flight: AnyObj) => void;
}> = () => {
  return <div className="rounded-2xl border p-6">FlightResults (stub)</div>;
};

const BookingForm: React.FC<{
  flight: AnyObj;
  searchData: AnyObj;
  onBack: () => void;
  onBooking: (booking: AnyObj) => void;
}> = () => {
  return <div className="rounded-2xl border p-6">BookingForm (stub)</div>;
};

const BookingConfirmation: React.FC<{
  bookingData: AnyObj;
  onNewSearch: () => void;
}> = () => {
  return (
    <div className="rounded-2xl border p-6">BookingConfirmation (stub)</div>
  );
};

const MyTrips: React.FC<{ onNewSearch: () => void }> = () => {
  return <div className="rounded-2xl border p-6">MyTrips (stub)</div>;
};

const Help: React.FC<{ onNewSearch: () => void }> = () => {
  return <div className="rounded-2xl border p-6">Help (stub)</div>;
};
/* ====== Hết stub ====== */

type AppState =
  | "search"
  | "results"
  | "booking"
  | "confirmation"
  | "mytrips"
  | "help";

export default function App() {
  const [currentState, setCurrentState] = useState<AppState>("search");
  const [searchData, setSearchData] = useState<any>(null);
  const [selectedFlight, setSelectedFlight] = useState<any>(null);
  const [bookingData, setBookingData] = useState<any>(null);

  const handleSearch = (data: any) => {
    setSearchData(data);
    setCurrentState("results");
  };

  const handleSelectFlight = (flight: any) => {
    setSelectedFlight(flight);
    setCurrentState("booking");
  };

  const handleBooking = (booking: any) => {
    setBookingData(booking);
    setCurrentState("confirmation");
  };

  const handleNewSearch = () => {
    setCurrentState("search");
    setSearchData(null);
    setSelectedFlight(null);
    setBookingData(null);
  };

  const handleBackToResults = () => {
    setCurrentState("results");
    setSelectedFlight(null);
  };

  const handleMyTrips = () => setCurrentState("mytrips");
  const handleHelp = () => setCurrentState("help");

  const getCurrentPage = () => {
    switch (currentState) {
      case "search":
      case "results":
      case "booking":
      case "confirmation":
        return "flights";
      case "mytrips":
        return "mytrips";
      case "help":
        return "help";
      default:
        return "flights";
    }
  };

  return (
    <div className="dark min-h-screen bg-background">
      <Header
        onMyTrips={handleMyTrips}
        onFlights={handleNewSearch}
        onHelp={handleHelp}
        currentPage={getCurrentPage()}
      />

      <main className="container mx-auto px-6 py-12 max-w-6xl">
        {currentState === "search" && (
          <div className="space-y-12">
            <div className="text-center space-y-6 pt-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/5 border border-primary/20 rounded-full text-primary font-medium">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                Book with confidence
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Fly to your dream with FlyDreamAir
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Your trusted partner for finding flights, comparing fares, and
                traveling stress-free.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-3xl"></div>
              {/* dùng stub thay cho import thật */}
              <FlightSearch onSearch={handleSearch} />
            </div>
          </div>
        )}

        {currentState === "results" && searchData && (
          <FlightResults
            searchData={searchData}
            onSelectFlight={handleSelectFlight}
          />
        )}

        {currentState === "booking" && selectedFlight && searchData && (
          <BookingForm
            flight={selectedFlight}
            searchData={searchData}
            onBack={handleBackToResults}
            onBooking={handleBooking}
          />
        )}

        {currentState === "confirmation" && bookingData && (
          <BookingConfirmation
            bookingData={bookingData}
            onNewSearch={handleNewSearch}
          />
        )}

        {currentState === "mytrips" && <MyTrips onNewSearch={handleNewSearch} />}

        {currentState === "help" && <Help onNewSearch={handleNewSearch} />}
      </main>

      <Footer />
    </div>
  );
}
