import { DOCUMENT } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

@Component({
  selector: "app-export",
  templateUrl: "./export.component.html",
  styleUrls: ["./export.component.scss"],
})
export class ExportComponent implements OnInit {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {}
  print() {
    const doc = new jsPDF();
    let data = document.getElementById("printPdf");
    this.generatePDF(data);
  }

  generatePDF(htmlContent) {
    html2canvas(htmlContent).then((canvas) => {
      const imgWidth = 210; // PDF page width in mm
      const pageHeight = 297; // PDF page height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL("image/png");
      let pdf = new jsPDF("l", "mm", "a4");
      let position = 10;
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      pdf.save("Groceries.pdf");
    });
  }
  shareMe() {
    //let x = this.document.location.href;
    const navigator = window.navigator as any;
    alert(1);
    if (navigator.share) {
      alert(2);
      navigator
        .share({
          title: "I am sharing my groceries list with you, Have Fun :)",
          url: "",
        })
        .then(() => {
          console.log("Thanks For Sharing!");
        })
        .catch(console.error);
    }
  }
  public exportToPDF() {
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
