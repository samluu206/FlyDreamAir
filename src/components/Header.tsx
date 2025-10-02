import { Plane } from "lucide-react";

interface HeaderProps {
  onMyTrips?: () => void;
  onFlights?: () => void;
  onHelp?: () => void;
  currentPage?: 'flights' | 'mytrips' | 'help';
}

export function Header({ onMyTrips, onFlights, onHelp, currentPage = 'flights' }: HeaderProps) {
  const getNavItemClasses = (page: string) => {
    const baseClasses = "transition-all duration-200 relative font-medium";
    const isActive = currentPage === page;
    
    if (isActive) {
      return `${baseClasses} text-primary bg-primary/10 shadow-sm`;
    }
    
    return `${baseClasses} text-muted-foreground hover:text-primary hover:bg-primary/5`;
  };

  return (
    <header className="bg-card/95 backdrop-blur-sm shadow-lg border-b border-border/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-18">
          <button 
            onClick={onFlights}
            className="flex items-center space-x-3 hover:scale-105 transition-transform duration-200 group"
          >
            <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
              <Plane className="h-6 w-6 text-primary transform group-hover:rotate-12 transition-transform duration-200" />
            </div>
            <h1 className="text-2xl font-bold text-card-foreground tracking-tight">
              FlyDreamAir
            </h1>
          </button>
          <nav className="flex items-center space-x-1 bg-muted/30 rounded-2xl p-1">
            <button
              onClick={onFlights}
              className={`${getNavItemClasses('flights')} px-6 py-2.5 rounded-xl transition-all duration-200`}
            >
              Flights
            </button>
            <button
              onClick={onMyTrips}
              className={`${getNavItemClasses('mytrips')} px-6 py-2.5 rounded-xl transition-all duration-200`}
            >
              My Trips
            </button>
            <button
              onClick={onHelp}
              className={`${getNavItemClasses('help')} px-6 py-2.5 rounded-xl transition-all duration-200`}
            >
              Help
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}