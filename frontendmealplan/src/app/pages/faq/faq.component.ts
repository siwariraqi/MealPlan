import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  public faqs = [
    { 
      question: 'How do I make a booking?', 
      status: 'Question about booking', 
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc feugiat, sapien id rhoncus pretium, leo massa pellentesque magna, non mattis lectus risus sit amet turpis. Cras et semper tellus. Sed sed leo sapien. Nunc eros nibh, tempor quis rhoncus eget, condimentum vel odio. Duis vitae lacus ligula. Aenean elementum euismod pretium. Nullam sit amet lectus molestie, condimentum odio accumsan, sodales nibh.' 
    },
    { 
      question: 'How can I be certain my booking\'s been received?', 
      status: 'Customer FAQs', 
      answer: 'Maecenas aliquet cursus tellus in imperdiet. Vivamus consequat ipsum augue, a vulputate eros porta eu. Sed consectetur turpis a arcu dapibus, sit amet elementum dui posuere. Ut sodales nisl nec rhoncus dignissim. Nunc maximus est sed nibh mattis fringilla. Donec vehicula interdum neque bibendum feugiat. Sed porttitor elementum vehicula. Phasellus fermentum leo erat, non fermentum ipsum elementum sed. ' 
    },
    { 
      question: 'What happens if I don\'t reconfirm my booking?', 
      status: 'Question about booking', 
      answer: 'Etiam a faucibus tortor, pellentesque viverra orci. Donec et cursus quam, eget molestie nisl. Etiam venenatis libero turpis, non placerat orci consequat ut. Nullam vitae lacinia elit. Proin pulvinar faucibus enim, et ullamcorper risus dapibus sit amet. Nam magna sapien, hendrerit eget gravida id, dapibus a diam. Proin condimentum elementum vestibulum. Sed hendrerit vestibulum diam, quis cursus ex efficitur non.' 
    },
    { 
      question: 'I\'m sure I\'ve booked, but I haven\'t had confirmation - what now?', 
      status: 'Customer FAQs', 
      answer: 'Curabitur vitae lorem felis. Aenean eu dolor et tortor viverra tempor ac eu lacus. Morbi eget elit ac ligula convallis sollicitudin eu et metus. Nam tempor lacus quis urna tincidunt varius non eu est. Fusce nec lorem eget ipsum dapibus tincidunt. Donec ut mauris efficitur ante pretium finibus. Vestibulum suscipit quis sapien in tincidunt. Aenean dictum sem sed justo venenatis, suscipit fringilla diam suscipit. Mauris sit amet lobortis purus, quis faucibus justo. Quisque tincidunt magna turpis, nec ultrices lorem mollis quis.' 
    },
    { 
      question: 'What happens if I\'m running late?', 
      status: 'Customer FAQs', 
      answer: 'Ut sodales nisl nec rhoncus dignissim. Nunc maximus est sed nibh mattis fringilla. Donec vehicula interdum neque bibendum feugiat. Sed porttitor elementum vehicula. Phasellus fermentum leo erat, non fermentum ipsum elementum sed. Mauris non risus lectus. Morbi ut metus et nisi malesuada mollis. Maecenas placerat ante urna, sed efficitur magna tempor ac. Nam posuere lorem diam, sit amet rhoncus massa consectetur in. In nec tincidunt ipsum, non volutpat augue. Nam quis imperdiet nisi.' 
    },
    { 
      question: 'How do I cancel a booking?', 
      status: 'Question about booking', 
      answer: 'Phasellus nec dapibus est. Nullam erat neque, porttitor sed massa non, vulputate vestibulum libero. Donec quis odio id mi auctor pellentesque. Nulla facilisi. Morbi sed orci neque. Mauris dictum sapien efficitur sagittis efficitur. Fusce tristique rhoncus mauris, sed tristique arcu scelerisque id.' 
    },
    { 
      question: 'How much do I have to pay for my booking?', 
      status: 'Customer FAQs', 
      answer: 'Etiam a faucibus tortor, pellentesque viverra orci. Donec et cursus quam, eget molestie nisl. Etiam venenatis libero turpis, non placerat orci consequat ut. Nullam vitae lacinia elit. Proin pulvinar faucibus enim, et ullamcorper risus dapibus sit amet. Nam magna sapien, hendrerit eget gravida id, dapibus a diam. Proin condimentum elementum vestibulum. Sed hendrerit vestibulum diam, quis cursus ex efficitur non.' 
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
