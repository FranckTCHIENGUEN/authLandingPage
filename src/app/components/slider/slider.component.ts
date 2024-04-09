import {Component, Input, OnInit} from '@angular/core';
import {FaIconComponent, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {MatAnchor} from "@angular/material/button";

export interface slideFields{
  textColor?:string,
  logo?: string,
  title?: string,
  description?: string,
  backgroundExpanded?: string,
  backgroundCollapsed?: string,
  ctaText?: string,
  ctaLink?: string,
}
@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [
    FaIconComponent,
    NgClass,
    NgStyle,
    MatAnchor,
    NgIf,
    NgForOf
  ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})


export class SliderComponent implements OnInit{
  // @Input() slides: any[] = [];
  @Input() indicatorsVisible = true;
  @Input() animationSpeed = 500;
  @Input() autoPlay = false;
  @Input() autoPlaySpeed = 3000;
  currentSlide = 0;
  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;
  hidden = true;

  activeSlideIndex = 0;
  @Input()  slides:slideFields[] = [
    {
      textColor: '#000',
      logo: '',
      title: 'NEW COLLAB: COCA-COLA X TIMEX',
      description: 'Two iconic American brands have come together to celebrate harmony with new watches in our 1971 Unity Collection.',
      backgroundExpanded: `url('https://us.coca-cola.com/store/media/wysiwyg/COKE-421-Desktop-Expanded.png')`,
      backgroundCollapsed: `url('https://us.coca-cola.com/store/media/wysiwyg/COKE-421-Desktop-Collapsed.png')`,
      ctaText: 'SHOP NOW',
      ctaLink: 'https://adnanhalilovic.com',
    },
    {
      textColor: "#fff",
      logo: "https://us.coca-cola.com/store/media/wysiwyg/coke-morphe.png",
      title: "",
      description: 'Explore our new line of Morphe products burstling with color and attitide, inspired by Cherry Coke.',
      backgroundExpanded: `url('https://us.coca-cola.com/store/media/wysiwyg/coke-400-desktop-expanded.png')`,
      backgroundCollapsed: `url('https://us.coca-cola.com/store/media/wysiwyg/coke-400-desktop-collapsed.png')`,
      ctaText: 'DISCOVER',
      ctaLink: 'https://adnanhalilovic.com'
    },
    {
      textColor: "#fff",
      logo: "",
      title: "PERSONALIZE YOUR COKE",
      description: 'With custom bottle designs for every occasion',
      backgroundExpanded: `url('https://us.coca-cola.com/store/media/wysiwyg/coke-406-desktop-expanded_1.png')`,
      backgroundCollapsed: `url('https://us.coca-cola.com/store/media/wysiwyg/coke-406-desktop-collapsed_1.png')`,
      ctaText: 'SHOP NOW',
      ctaLink: 'https://adnanhalilovic.com'
    }
  ]

  next() {
    let currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.jumpToSlide(currentSlide);
  }

  previous() {
    let currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.jumpToSlide(currentSlide);
  }

  jumpToSlide(index: number) {
    this.hidden = true;
    setTimeout(() => {
      this.currentSlide = index;
      this.hidden = false;
    }, this.animationSpeed);
  }

  ngOnInit() {
    if (this.autoPlay) {
      setInterval(() => {
        this.next();
      }, this.autoPlaySpeed);
    }
  }
}
