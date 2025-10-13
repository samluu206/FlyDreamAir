import { useState } from "react";
import { Plane, Menu, X } from "lucide-react";

interface HeaderProps {
  onMyTrips?: () => void;
  onFlights?: () => void;
  onHelp?: () => void;
  currentPage?: 'flights' | 'mytrips' | 'help';
}

export function Header({ onMyTrips, onFlights, onHelp, currentPage = 'flights' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getNavItemClasses = (page: string) => {
    const baseClasses = "transition-all duration-200 relative font-medium";
    const isActive = currentPage === page;

    if (isActive) {
      return `${baseClasses} text-primary bg-primary/10 shadow-sm`;
    }

    return `${baseClasses} text-muted-foreground hover:text-primary hover:bg-primary/5`;
  };

  const handleNavClick = (action?: () => void) => {
    setMobileMenuOpen(false);
    action?.();
  };

  return (
    <header className="bg-card/95 backdrop-blur-sm shadow-lg border-b border-border/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between items-center h-16 sm:h-18">
          <button
            onClick={onFlights}
            className="flex items-center space-x-2 sm:space-x-3 hover:scale-105 transition-transform duration-200 group"
          >
            <div className="p-1.5 sm:p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
              <Plane className="h-5 w-5 sm:h-6 sm:w-6 text-primary transform group-hover:rotate-12 transition-transform duration-200" />
            </div>
            <h1 className="text-lg sm:text-2xl font-bold text-card-foreground tracking-tight">
              FlyDreamAir
            </h1>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 bg-muted/30 rounded-2xl p-1">
            <button
              onClick={onFlights}
              className={`${getNavItemClasses('flights')} px-4 lg:px-6 py-2.5 rounded-xl transition-all duration-200 text-sm lg:text-base`}
            >
              Flights
            </button>
            <button
              onClick={onMyTrips}
              className={`${getNavItemClasses('mytrips')} px-4 lg:px-6 py-2.5 rounded-xl transition-all duration-200 text-sm lg:text-base`}
            >
              My Trips
            </button>
            <button
              onClick={onHelp}
              className={`${getNavItemClasses('help')} px-4 lg:px-6 py-2.5 rounded-xl transition-all duration-200 text-sm lg:text-base`}
            >
              Help
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-2">
            <button
              onClick={() => handleNavClick(onFlights)}
              className={`${getNavItemClasses('flights')} w-full text-left px-4 py-3 rounded-xl transition-all duration-200`}
            >
              Flights
            </button>
            <button
              onClick={() => handleNavClick(onMyTrips)}
              className={`${getNavItemClasses('mytrips')} w-full text-left px-4 py-3 rounded-xl transition-all duration-200`}
            >
              My Trips
            </button>
            <button
              onClick={() => handleNavClick(onHelp)}
              className={`${getNavItemClasses('help')} w-full text-left px-4 py-3 rounded-xl transition-all duration-200`}
            >
              Help
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}