export class basePage{
    Processing: boolean;

    FormatDate(d: Date): string{;
        let year = d.getFullYear();
        let month = (d.getMonth() + 1) > 9 ? (d.getMonth() + 1).toString() : '0' + (d.getMonth() + 1).toString();
        let day = d.getDate() > 9 ? d.getDate().toString() : '0' + d.getDate().toString();
        return year + '-' + month + '-' + day;
    }
}