import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginInfo } from '../models/login-model';
import { JwtResponse } from '../models/jwt-model';
import { RegisterInfo } from '../models/register-model';
import { SimpleResponse } from '../models/simpleResponse-model';
import { SimpleFolder, SimpleFolder2 } from '../models/simplefolder-model';
import { UploadedFileInfo, UploadPicInfo } from '../models/uploadpic-model';
import { ConstantService } from '../services/ConstantService';



const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class FileService {

    private pictureUploadUrl = ConstantService.baseUrl +'/file';
    private getFoldersUrl = ConstantService.baseUrl + '/folders';
    private postPostUrl = ConstantService.baseUrl + '/posts/sendPostUF';
    constructor(private http: HttpClient) {
    }

    postImage(file: File): Observable<UploadedFileInfo> {
        var upFile = new FormData();
        upFile.append('file', file, file.name)
        return this.http.post<UploadedFileInfo>(this.pictureUploadUrl, upFile)
    }

    postPost(info: UploadPicInfo): Observable<string>{
        return this.http.post<string>(this.postPostUrl, info, httpOptions)
    }

    getFolders(): Observable<SimpleFolder2[]> {
        return this.http.get<SimpleFolder2[]>(this.getFoldersUrl, httpOptions)
    }

    postFolder(folder: SimpleFolder): Observable<SimpleFolder> {
        return this.http.post<SimpleFolder>(this.getFoldersUrl, folder, httpOptions)
    }
}