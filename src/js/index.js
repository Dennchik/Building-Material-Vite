import '../scss/index.scss';
import { buildSwiper } from './utils/build-swiper.js';
buildSwiper();
import { slide, slidNews } from './components/slide.js';
slide('.product-slide');
slidNews('.slide-news');
