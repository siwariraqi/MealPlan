import { Component, OnInit } from "@angular/core";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

@Component({
  selector: "app-export",
  templateUrl: "./export.component.html",
  styleUrls: ["./export.component.scss"],
})
export class ExportComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  print() {
    const doc = new jsPDF();
    let data = document.getElementById("printPdf");
    this.generatePDF(data);
  }

  generatePDF(htmlContent) {
    html2canvas(htmlContent).then((canvas) => {
      let imgWidth = canvas.width * 0.25;
      let imgHeight = canvas.height * 0.25;
      const contentDataURL = canvas.toDataURL("image/png");
      let pdf = new jsPDF("l", "mm", "a4");
      let position = 10;
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      pdf.save("Login.pdf");
    });
  }
  shareMe() {
    if (navigator.share) {
      navigator
        .share({
          title: "Iam sharing my recipe ingredients with you, Have Fun :)",
          url: "" + document.location.href,
        })
        .then(() => {
          console.log("Thanks For Sharing!");
        })
        .catch(console.error);
    }
  }
}
