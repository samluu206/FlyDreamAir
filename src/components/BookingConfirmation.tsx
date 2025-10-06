import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { CheckCircle, Download, Mail, Calendar, MapPin, Plane } from "lucide-react";

interface BookingConfirmationProps {
  bookingData: any;
  onNewSearch: () => void;
}

export function BookingConfirmation({ bookingData, onNewSearch }: BookingConfirmationProps) {
  const { flight, passengerInfo, searchData } = bookingData;
  const bookingReference = `SB${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  
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
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Success Header */}
      <Card className="bg-green-900/20 border-green-500/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-center text-center space-y-4 flex-col">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <div>
              <h1 className="text-2xl font-bold text-green-400">Booking Confirmed!</h1>
              <p className="text-green-300 mt-2">
                Your flight has been successfully booked. A confirmation email has been sent to {passengerInfo.email}.
              </p>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Booking Reference: {bookingReference}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Flight Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plane className="h-5 w-5" />
              Flight Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Outbound Flight */}
            <div className="space-y-3">
              <h3 className="font-semibold text-card-foreground">
                {isRoundTrip ? 'Outbound Flight' : 'Flight'}
              </h3>
              <div className="bg-muted/50 p-3 rounded-lg space-y-2">
                <div className="space-y-1">
                  <h4 className="font-semibold">{outboundFlight.airline}</h4>
                  <p className="text-sm text-muted-foreground">{outboundFlight.flightNumber} • {outboundFlight.aircraft}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-sm text-muted-foreground">DEPARTURE</h5>
                    <p className="font-semibold">{outboundFlight.departTime}</p>
                    <p className="text-sm text-muted-foreground">{outboundFlight.from}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-sm text-muted-foreground">ARRIVAL</h5>
                    <p className="font-semibold">{outboundFlight.arriveTime}</p>
                    <p className="text-sm text-muted-foreground">{outboundFlight.to}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span>Duration: {outboundFlight.duration}</span>
                  <Badge variant={outboundFlight.stops === 0 ? "default" : "secondary"}>
                    {outboundFlight.stops === 0 ? 'Direct' : `${outboundFlight.stops} stop${outboundFlight.stops > 1 ? 's' : ''}`}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Return Flight */}
            {isRoundTrip && returnFlight && (
              <div className="space-y-3">
                <h3 className="font-semibold text-card-foreground">Return Flight</h3>
                <div className="bg-muted/50 p-3 rounded-lg space-y-2">
                  <div className="space-y-1">
                    <h4 className="font-semibold">{returnFlight.airline}</h4>
                    <p className="text-sm text-muted-foreground">{returnFlight.flightNumber} • {returnFlight.aircraft}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-sm text-muted-foreground">DEPARTURE</h5>
                      <p className="font-semibold">{returnFlight.departTime}</p>
                      <p className="text-sm text-muted-foreground">{returnFlight.from}</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-sm text-muted-foreground">ARRIVAL</h5>
                      <p className="font-semibold">{returnFlight.arriveTime}</p>
                      <p className="text-sm text-muted-foreground">{returnFlight.to}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Duration: {returnFlight.duration}</span>
                    <Badge variant={returnFlight.stops === 0 ? "default" : "secondary"}>
                      {returnFlight.stops === 0 ? 'Direct' : `${returnFlight.stops} stop${returnFlight.stops > 1 ? 's' : ''}`}
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            <Separator />

            <div className="space-y-2">
              <h4 className="font-medium text-sm text-muted-foreground">PASSENGER</h4>
              <p className="font-semibold text-card-foreground">{passengerInfo.firstName} {passengerInfo.lastName}</p>
              <p className="text-sm text-muted-foreground">{passengerInfo.email}</p>
              <p className="text-sm text-muted-foreground">{passengerInfo.phone}</p>
            </div>
          </CardContent>
        </Card>

        {/* Booking Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
              <div className="flex justify-between font-semibold text-lg">
                <span>Total Paid</span>
                <span>${finalTotal}</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="font-medium text-sm text-muted-foreground">PAYMENT METHOD</h4>
              <p className="font-semibold text-card-foreground">Credit Card</p>
              <p className="text-sm text-muted-foreground">****-****-****-{bookingData.paymentInfo.cardNumber.slice(-4)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Important Information */}
      <Card>
        <CardHeader>
          <CardTitle>Important Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium text-sm text-card-foreground">Check-in</h4>
                <p className="text-sm text-muted-foreground">Opens 24 hours before departure</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium text-sm text-card-foreground">Airport Arrival</h4>
                <p className="text-sm text-muted-foreground">Arrive 2 hours before domestic flights</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium text-sm text-card-foreground">Confirmation</h4>
                <p className="text-sm text-muted-foreground">Email sent to {passengerInfo.email}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Boarding Pass
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Email Confirmation
        </Button>
        <Button onClick={onNewSearch}>
          Book Another Flight
        </Button>
      </div>
    </div>
  );
}