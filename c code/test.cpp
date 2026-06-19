#include<iostream>
#include<vector>
#include<string>
#include<algorithm>
using namespace std ; 

       vector<string> fullJustify(vector<string>& words, int maxWidth) {
       int n = words.size() , temp , oWordlen , j ;  
       vector<string> v ; 
       string s;  
       for(int i = 0 ; i<n ; i++ ) {
           j = i ; 
           oWordlen = 0 ; 
           int space ; 
           temp = maxWidth ; 
           s = "" ; 
           // no. of word we can take and actual length of word within maxwidth 
           temp =  temp-(words[j].length()+1) ; 
           while(j < n && ((temp) >= 0) ){
               oWordlen +=words[j].length() ; 
                j++ ; 
                temp-=(words[j].length()+1) ; 
            }
          int totalSpace = maxWidth - oWordlen ;
          cout<<j-i <<endl ; 
         if(j-i>2)
          space = (maxWidth - oWordlen)/(j-i-1) ; 
          else {
            for(int k = i ; k<j ; k++){
                s+=words[k] ; 
                s+=" " ; 
            }
            for(int k = 0 ; k <(totalSpace -(j-i)) ; k++) {
                s+=" " ; 
            }
              v.push_back(s) ; 
              i = j-1 ; 
              break ; 
          } 
        
          // generate space 
          string sp = ""; 
          for(int m = 0 ; m<space ; m++){
             sp+= " " ; 
          }
          for(int k = i ; k<j ; k++){
            if(k > i && k <= j-2){
                s+= words[k] ; 
                totalSpace-=space ; 
                s+=sp ; 
            }
             else  {
                s+= words[k] ; 
                if(totalSpace >= space){
                 if(j == i+1) s+=sp ; 
                else {
                for(int m = 0 ; m < (totalSpace - (space*(j-i-2))) ; m++) s+=" " ; 
                 totalSpace-=((totalSpace - (space*(j-i-2)))) ; 
                }
                }
             } 
          }
            v.push_back(s) ; 
             i = j-1 ; 
       }
      return v ; 
       
    }
int main() {
    vector<string> v = {"What","must","be","acknowledgment","shall","be"} ; 
    vector<string> result =  fullJustify( v, 16 )  ; 
    
}