import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface NavItem { label: string; icon: string; route: string; }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentRoute = '';

  navItems: NavItem[] = [
    { label: 'Video Player',  icon: 'movie',        route: '/player'      },
    { label: 'Add Video',     icon: 'video_call',   route: '/add-video'   },
    { label: 'Video Library', icon: 'video_library',route: '/videos'      },
    { label: 'Add Client',    icon: 'person_add',   route: '/add-client'  },
    { label: 'Client List',   icon: 'people',       route: '/clients'     },
  ];

  isMobile = window.innerWidth < 768;

  constructor(private router: Router) {
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 768;
    });
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => { this.currentRoute = e.urlAfterRedirects; });
  }

  
  navigate(route: string) { this.router.navigate([route]); }

  isActive(route: string): boolean {
    return this.currentRoute.startsWith(route);
  }
}
