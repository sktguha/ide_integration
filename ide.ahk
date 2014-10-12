#SingleInstance force
^+Space::
Send ^a
Sleep, 500 
Send ^c
Sleep, 500 
WinGetTitle, Title, A
Run, http://www.hc1407066179862.com?id=%Title%
return