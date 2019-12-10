import { HttpHeaders } from '@angular/common/http';

export const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  export const httpOptions2 = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJoZWxsb2wiLCJpYXQiOjE1NzE4MzA0OTIsImV4cCI6MTU3MjMzMTE0Nn0.LarH-QxP3veigy7a5pxGv-K11K1sf_a9NABVIxPl56QkkJ8OIQfTGFJFEQY8kXwcG8fLQhiofkpHK42tV3onnQ'})
  };
   
