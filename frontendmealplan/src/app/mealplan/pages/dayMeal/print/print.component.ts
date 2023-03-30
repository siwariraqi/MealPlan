import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  print(){
     const doc =new jsPDF();
     let data=document.getElementById('printPdf')
     this.generatePDF(data);
   }

  generatePDF(htmlContent){
    const data = document.getElementById("printPdf");
    html2canvas(data).then((canvas) => {
      const imgWidth = 210; // PDF page width in mm
      const pageHeight = 297; // PDF page height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4"); // create PDF object
      let position = 0;
  
      pdf.addImage(contentDataURL, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
  
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(contentDataURL, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
  
      pdf.save("long-page.pdf"); // save PDF file
    });
  }

}

