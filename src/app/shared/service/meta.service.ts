import { Inject, Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { PageMetadata } from '../model/page-metadata.model';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

const defaultMetadata: PageMetadata = {
  title: 'Randly',
  description: 'Randly is your tool for recipe management',
  author: 'Christian Hunziker',
  keywords: ['Randly', 'Recipe', 'Shopping Basket'],
  type: 'website',
}

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  constructor(private metaTagService: Meta,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private titleService: Title) { }

  public updateMetadata(metadata: Partial<PageMetadata>, index: boolean = true): void {
    const pageMetadata: PageMetadata = { ...defaultMetadata, ...metadata };
    pageMetadata.title = `Randly - ${pageMetadata.title}`;
    const metatags: MetaDefinition[] = this.generateMetaDefinitions(pageMetadata);

    this.metaTagService.addTags([
      ...metatags,
      { property: 'og:url', content: `${this.document.location.host}${this.router.url}` },
      { name: 'robots', content: index ? 'index, follow' : 'noindex' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' },
    ]);

    this.titleService.setTitle(pageMetadata.title);
  }

  private generateMetaDefinitions(metadata: PageMetadata): MetaDefinition[] {
    return [
      { name: 'title', content: metadata.title },
      { property: 'og:title', content: metadata.title },

      { name: 'description', content: metadata.description },
      { property: 'og:description', content: metadata.description },

      { name: 'author', content: metadata.author },
      { property: 'og:author', content: metadata.author },

      { name: 'keywords', content: metadata.keywords.join(', ') },

      { property: 'og:type', content: metadata.type },
    ];
  }
}
