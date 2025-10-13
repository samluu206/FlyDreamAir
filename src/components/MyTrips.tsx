import { useState } from "react";
import { Calendar, Clock, Plane, MapPin, User, Luggage, Utensils, Shield, Star, Edit, Trash2, Plus, CreditCard, Download, Receipt, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";

// Mock data for booked trips - indexed by reference number
const mockTripsData = {
  VJ123: {
    id: "SKY001",
    pnr: "VJ123",
    passengerName: "John Smith",
    flight: {
      airline: "VietJet Air",
      flightNumber: "VJ123",
      from: "Sydney",
      to: "Danang",
      fromCode: "SYD",
      toCode: "DAD",
      date: "November 19, 2025",
      departureTime: "08:30",
      arrivalTime: "14:45",
      duration: "7h 15m"
    },
    status: "confirmed",
    seat: "12A",
    services: {
      baggage: {
        checkedBags: 1,
        weight: "23kg",
        carryOn: "7kg"
      },
      meal: "Vegetarian",
      insurance: true,
      priorityBoarding: true
    },
    price: "$580",
    payment: {
      ticketPrice: 520,
      serviceFees: 60,
      totalPaid: 580,
      outstandingAmount: 0,
      paymentStatus: "paid",
      invoiceNumber: "INV-VJ123-001"
    }
  },
  VA123: {
    id: "SKY002", 
    pnr: "VA123",
    passengerName: "Emily Johnson",
    flight: {
      airline: "VietJet Air",
      flightNumber: "VJ456",
      from: "Danang",
      to: "Sydney", 
      fromCode: "DAD",
      toCode: "SYD",
      date: "February 28, 2026",
      departureTime: "16:20",
      arrivalTime: "05:30+1",
      duration: "8h 10m"
    },
    status: "pending",
    seat: "15C",
    services: {
      baggage: {
        checkedBags: 2,
        weight: "46kg", 
        carryOn: "7kg"
      },
      meal: "Standard",
      insurance: false,
      priorityBoarding: false
    },
    price: "$620",
    payment: {
      ticketPrice: 550,
      serviceFees: 70,
      totalPaid: 520,
      outstandingAmount: 100,
      paymentStatus: "partial",
      invoiceNumber: "INV-VJ456-002"
    }
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'confirmed':
      return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Confirmed</Badge>;
    case 'pending':
      return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pending</Badge>;
    case 'canceled':
      return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Canceled</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

interface MyTripsProps {
  onNewSearch: () => void;
}

export function MyTrips({ onNewSearch }: MyTripsProps) {
  const [bookingReference, setBookingReference] = useState("");
  const [lastName, setLastName] = useState("");
  const [searchedTrip, setSearchedTrip] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSearch = () => {
    const reference = bookingReference.toUpperCase().trim();
    const name = lastName.trim();

    if (reference === "" || name === "") {
      setError("Please enter both booking reference and last name");
      setSearchedTrip(null);
      return;
    }

    // Check if the combination is valid
    const validPairs = [
      { reference: "VJ123", lastName: "Luu" },
      { reference: "VA123", lastName: "Luu" }
    ];

    const isValidPair = validPairs.some(pair =>
      pair.reference === reference && pair.lastName.toLowerCase() === name.toLowerCase()
    );

    if (isValidPair) {
      const trip = mockTripsData[reference as keyof typeof mockTripsData];
      setSearchedTrip(trip);
      setError("");
    } else {
      setSearchedTrip(null);
      setError("Invalid booking reference or last name. Please try again.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="font-bold text-foreground">Find Your Trip</h2>
        <p className="text-muted-foreground">Enter your booking reference and last name to view trip details</p>
      </div>

      {/* Search Section */}
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="font-medium text-foreground">Booking Reference</label>
                <Input
                  type="text"
                  placeholder="Enter booking reference (e.g., VJ123)"
                  value={bookingReference}
                  onChange={(e) => setBookingReference(e.target.value.toUpperCase())}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <div className="space-y-2">
                <label className="font-medium text-foreground">Last Name</label>
                <Input
                  type="text"
                  placeholder="Enter your last name (e.g., Luu)"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <Button onClick={handleSearch} className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                {error}
              </div>
            )}
          </div>
        </Card>

        {/* New Search Button */}
        <div className="text-center">
          <Button onClick={onNewSearch} variant="outline" className="hover:bg-primary/10">
            <Plus className="h-4 w-4 mr-2" />
            Book New Flight
          </Button>
        </div>
      </div>

      {/* Results Section */}
      {searchedTrip && (
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 text-center">
            <h3 className="font-semibold text-foreground">Trip Details</h3>
            <p className="text-muted-foreground">Booking Reference: {searchedTrip.pnr}</p>
          </div>
          <Card className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <Plane className="h-5 w-5 text-primary" />
                    {searchedTrip.flight.airline} - {searchedTrip.flight.flightNumber}
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Booking Reference: <span className="font-mono text-foreground">{searchedTrip.pnr}</span>
                  </p>
                </div>
                <div className="text-right space-y-1">
                  {getStatusBadge(searchedTrip.status)}
                  <p className="font-semibold">{searchedTrip.price}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Flight Information */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="h-4 w-4" />
                    Passenger
                  </div>
                  <p className="font-medium">{searchedTrip.passengerName}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Flight Date
                  </div>
                  <p className="font-medium">{searchedTrip.flight.date}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    Seat
                  </div>
                  <p className="font-medium text-primary">{searchedTrip.seat}</p>
                </div>
              </div>

              {/* Route and Time */}
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="font-bold">{searchedTrip.flight.departureTime}</p>
                    <p className="text-muted-foreground">{searchedTrip.flight.fromCode}</p>
                    <p className="font-medium">{searchedTrip.flight.from}</p>
                  </div>
                  
                  <div className="flex-1 mx-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t-2 border-dashed border-muted-foreground/30"></div>
                      </div>
                      <div className="relative flex justify-center">
                        <div className="bg-card px-3 py-1 rounded-full border">
                          <div className="flex items-center gap-2">
                            <Plane className="h-4 w-4 text-primary" />
                            <span className="text-muted-foreground">{searchedTrip.flight.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="font-bold">{searchedTrip.flight.arrivalTime}</p>
                    <p className="text-muted-foreground">{searchedTrip.flight.toCode}</p>
                    <p className="font-medium">{searchedTrip.flight.to}</p>
                  </div>
                </div>
              </div>

              {/* Services and Details */}
              <Tabs defaultValue="services" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="services">Services & Baggage</TabsTrigger>
                  <TabsTrigger value="manage">Manage Ticket</TabsTrigger>
                  <TabsTrigger value="payment">Payment & Invoice</TabsTrigger>
                </TabsList>
                
                <TabsContent value="services" className="space-y-4 mt-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium flex items-center gap-2">
                        <Luggage className="h-4 w-4" />
                        Baggage
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Checked baggage:</span>
                          <span>{searchedTrip.services.baggage.checkedBags} bag ({searchedTrip.services.baggage.weight})</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Carry-on:</span>
                          <span>{searchedTrip.services.baggage.carryOn}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Additional Services</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Utensils className="h-4 w-4 text-muted-foreground" />
                          <span>Meal: {searchedTrip.services.meal}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-muted-foreground" />
                          <span>
                            Insurance: {searchedTrip.services.insurance ? 'Yes' : 'No'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-muted-foreground" />
                          <span>
                            Priority Boarding: {searchedTrip.services.priorityBoarding ? 'Yes' : 'No'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="manage" className="space-y-4 mt-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-medium">Ticket Changes</h4>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Calendar className="h-4 w-4 mr-2" />
                          Change Flight Date
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Edit className="h-4 w-4 mr-2" />
                          Change Seat
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Baggage
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Other Options</h4>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Clock className="h-4 w-4 mr-2" />
                          Web Check-in
                        </Button>
                        <Button variant="destructive" size="sm" className="w-full justify-start">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Cancel / Refund
                        </Button>
                      </div>
                      <p className="text-muted-foreground">
                        * Cancellation and refund fees depend on airline policy
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="payment" className="space-y-4 mt-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium flex items-center gap-2">
                        <Receipt className="h-4 w-4" />
                        Pricing Breakdown
                      </h4>
                      <div className="space-y-3 bg-muted/30 rounded-lg p-4">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Ticket Price:</span>
                          <span>${searchedTrip.payment.ticketPrice}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Service Fees:</span>
                          <span>${searchedTrip.payment.serviceFees}</span>
                        </div>
                        <div className="border-t pt-2 mt-2">
                          <div className="flex justify-between font-semibold">
                            <span>Total Amount:</span>
                            <span>${searchedTrip.payment.ticketPrice + searchedTrip.payment.serviceFees}</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Amount Paid:</span>
                          <span className="text-green-400">${searchedTrip.payment.totalPaid}</span>
                        </div>
                        {searchedTrip.payment.outstandingAmount > 0 && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Outstanding:</span>
                            <span className="text-red-400">${searchedTrip.payment.outstandingAmount}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Payment & Invoices
                      </h4>
                      <div className="space-y-3">
                        <div className="bg-muted/30 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-muted-foreground">Payment Status:</span>
                            <Badge className={
                              searchedTrip.payment.paymentStatus === 'paid' 
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                            }>
                              {searchedTrip.payment.paymentStatus === 'paid' ? 'Fully Paid' : 'Partial Payment'}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Invoice: {searchedTrip.payment.invoiceNumber}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <Download className="h-4 w-4 mr-2" />
                            Download Invoice
                          </Button>
                          
                          {searchedTrip.payment.outstandingAmount > 0 && (
                            <Button size="sm" className="w-full justify-start bg-primary text-primary-foreground hover:bg-primary/90">
                              <CreditCard className="h-4 w-4 mr-2" />
                              Pay Outstanding ${searchedTrip.payment.outstandingAmount}
                            </Button>
                          )}
                        </div>
                        
                        <p className="text-xs text-muted-foreground">
                          * All payments are processed securely. Invoices are available for download immediately after payment.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}