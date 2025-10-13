import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import { ArrowLeft, CreditCard, Shield, User } from "lucide-react";

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

interface RoundTripFlights {
  outbound: Flight;
  return: Flight;
  isRoundTrip: true;
}

interface BookingFormProps {
  flight: Flight | RoundTripFlights;
  searchData: any;
  onBack: () => void;
  onBooking: (bookingData: any) => void;
}

export function BookingForm({ flight, searchData, onBack, onBooking }: BookingFormProps) {
  const [passengerInfo, setPassengerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: ""
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
    billingAddress: "",
    city: "",
    zipCode: ""
  });

  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBooking({
      flight,
      passengerInfo,
      paymentInfo,
      searchData
    });
  };

  const isRoundTrip = 'isRoundTrip' in flight;
  const outboundFlight = isRoundTrip ? flight.outbound : flight;
  const returnFlight = isRoundTrip ? flight.return : null;
  
  const flightPrice = isRoundTrip 
    ? (flight.outbound.price + flight.return.price) 
    : flight.price;
  const totalPrice = flightPrice * searchData.passengers;
  const taxes = Math.round(totalPrice * 0.15);
  const fees = 29;
  const finalTotal = totalPrice + taxes + fees;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-4 sm:mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-4 text-sm sm:text-base">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Search Results
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Booking Form */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Passenger Information */}
          <Card>
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <User className="h-4 w-4 sm:h-5 sm:w-5" />
                Passenger Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-4 sm:px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={passengerInfo.firstName}
                    onChange={(e) => setPassengerInfo({...passengerInfo, firstName: e.target.value})}
                    placeholder="Enter first name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={passengerInfo.lastName}
                    onChange={(e) => setPassengerInfo({...passengerInfo, lastName: e.target.value})}
                    placeholder="Enter last name"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={passengerInfo.email}
                    onChange={(e) => setPassengerInfo({...passengerInfo, email: e.target.value})}
                    placeholder="Enter email address"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={passengerInfo.phone}
                    onChange={(e) => setPassengerInfo({...passengerInfo, phone: e.target.value})}
                    placeholder="Enter phone number"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={passengerInfo.dateOfBirth}
                    onChange={(e) => setPassengerInfo({...passengerInfo, dateOfBirth: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={passengerInfo.gender} onValueChange={(value) => setPassengerInfo({...passengerInfo, gender: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-4 sm:px-6">
              <div className="space-y-2">
                <Label htmlFor="nameOnCard">Name on Card *</Label>
                <Input
                  id="nameOnCard"
                  value={paymentInfo.nameOnCard}
                  onChange={(e) => setPaymentInfo({...paymentInfo, nameOnCard: e.target.value})}
                  placeholder="Enter name as it appears on card"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number *</Label>
                <Input
                  id="cardNumber"
                  value={paymentInfo.cardNumber}
                  onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date *</Label>
                  <Input
                    id="expiryDate"
                    value={paymentInfo.expiryDate}
                    onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV *</Label>
                  <Input
                    id="cvv"
                    value={paymentInfo.cvv}
                    onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                    placeholder="123"
                    required
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Billing Address</h4>
                <div className="space-y-2">
                  <Label htmlFor="billingAddress">Address *</Label>
                  <Input
                    id="billingAddress"
                    value={paymentInfo.billingAddress}
                    onChange={(e) => setPaymentInfo({...paymentInfo, billingAddress: e.target.value})}
                    placeholder="Enter billing address"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={paymentInfo.city}
                      onChange={(e) => setPaymentInfo({...paymentInfo, city: e.target.value})}
                      placeholder="Enter city"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code *</Label>
                    <Input
                      id="zipCode"
                      value={paymentInfo.zipCode}
                      onChange={(e) => setPaymentInfo({...paymentInfo, zipCode: e.target.value})}
                      placeholder="Enter ZIP code"
                      required
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terms and Conditions */}
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="terms"
                  checked={agreeToTerms}
                  onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                />
                <div className="space-y-1">
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the Terms and Conditions and Privacy Policy *
                  </Label>
                  <p className="text-xs text-gray-600">
                    By checking this box, you confirm that you have read and agree to our terms of service and privacy policy.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Summary */}
        <div className="lg:col-span-1">
          <Card className="lg:sticky lg:top-20">
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="text-lg sm:text-xl">Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-4 sm:px-6">
              {/* Flight Details */}
              <div className="space-y-4">
                {/* Outbound Flight */}
                <div className="space-y-2">
                  <h4 className="font-medium text-card-foreground">
                    {isRoundTrip ? 'Outbound Flight' : 'Flight'}
                  </h4>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <h5 className="font-medium">{outboundFlight.airline}</h5>
                    <p className="text-sm text-muted-foreground">{outboundFlight.flightNumber}</p>
                    <div className="text-sm">
                      <p>{outboundFlight.from} → {outboundFlight.to}</p>
                      <p>{outboundFlight.departTime} - {outboundFlight.arriveTime}</p>
                      <p>{outboundFlight.duration} • {outboundFlight.stops === 0 ? 'Direct' : `${outboundFlight.stops} stop${outboundFlight.stops > 1 ? 's' : ''}`}</p>
                    </div>
                  </div>
                </div>

                {/* Return Flight */}
                {isRoundTrip && returnFlight && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-card-foreground">Return Flight</h4>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <h5 className="font-medium">{returnFlight.airline}</h5>
                      <p className="text-sm text-muted-foreground">{returnFlight.flightNumber}</p>
                      <div className="text-sm">
                        <p>{returnFlight.from} → {returnFlight.to}</p>
                        <p>{returnFlight.departTime} - {returnFlight.arriveTime}</p>
                        <p>{returnFlight.duration} • {returnFlight.stops === 0 ? 'Direct' : `${returnFlight.stops} stop${returnFlight.stops > 1 ? 's' : ''}`}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              {/* Price Breakdown */}
              <div className="space-y-2">
                {isRoundTrip ? (
                  <>
                    <div className="flex justify-between text-sm">
                      <span>Outbound ({searchData.passengers} passenger{searchData.passengers > 1 ? 's' : ''})</span>
                      <span>${outboundFlight.price * searchData.passengers}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Return ({searchData.passengers} passenger{searchData.passengers > 1 ? 's' : ''})</span>
                      <span>${returnFlight!.price * searchData.passengers}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between text-sm">
                    <span>Flight ({searchData.passengers} passenger{searchData.passengers > 1 ? 's' : ''})</span>
                    <span>${totalPrice}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span>Taxes & Fees</span>
                  <span>${taxes}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Booking Fee</span>
                  <span>${fees}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${finalTotal}</span>
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-green-900/20 p-3 rounded-lg border border-green-500/20">
                <div className="flex items-center gap-2 text-green-400">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm font-medium">Secure Payment</span>
                </div>
                <p className="text-xs text-green-300 mt-1">
                  Your payment information is encrypted and secure.
                </p>
              </div>

              <Button 
                onClick={handleSubmit}
                className="w-full"
                size="lg"
                disabled={!agreeToTerms || !passengerInfo.firstName || !passengerInfo.lastName || !passengerInfo.email}
              >
                Complete Booking - ${finalTotal}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}