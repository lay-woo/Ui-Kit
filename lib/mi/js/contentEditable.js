function contentEditable(_editable){
    var editable = _editable, selection, range;
    var captureSelection = function(e){
        var isOrContainsAnchor = false,
	        isOrContainsFocus = false,
	        sel = window.getSelection(),
	        parentAnchor = sel.anchorNode,
	        parentFocus = sel.focusNode;

        while(parentAnchor && parentAnchor != document.documentElement){
            if(parentAnchor == editable){
                isOrContainsAnchor = true;
            }
            parentAnchor = parentAnchor.parentNode;
        }
        while(parentFocus && parentFocus != document.documentElement){
            if(parentFocus == editable){
                isOrContainsFocus = true;
            }
            parentFocus = parentFocus.parentNode;
        }
        if(!isOrContainsAnchor || !isOrContainsFocus){return;}

        selection = window.getSelection();

        if(selection.getRangeAt !== undefined){
            range = selection.getRangeAt(0);
        }else if(
            document.createRange &&
            selection.anchorNode &&
            selection.anchorOffset &&
            selection.focusNode &&
            selection.focusOffset
        ){
            range = document.createRange();
            range.setStart(selection.anchorNode, selection.anchorOffset);
            range.setEnd(selection.focusNode, selection.focusOffset);
        }else {
        }
    };
    editable.onkeyup = captureSelection;
    editable.onmousedown = function(e){
        editable.className = editable.className + ' selecting';
    };
    document.onmouseup = function(e){
        if(editable.className.match(/\sselecting(\s|$)/)){
            editable.className = editable.className.replace(/ selecting(\s|$)/, '');
            captureSelection();
        }
    };
    editable.onblur = function(e){
        var cursorBof = document.createElement('b'),
	        collapsed = !!range.collapsed;
	        cursorBof.id = 'cursorBof';
	        cursorBof.appendChild(document.createTextNode('|'));
        
        range.insertNode(cursorBof);
        if(!collapsed){
            var cursorEof = document.createElement('b');
	            cursorEof.id = 'cursorEof';
	            range.collapse();
	            range.insertNode(cursorEof);
        }
    };
    var afterFocus = [];
    editable.onfocus = function(e){
        setTimeout(function(){
            var cursorBof = document.getElementById('cursorBof'),
            	cursorEof = document.getElementById('cursorEof');
            if(editable.className.match(/\sselecting(\s|$)/)){
                if(cursorBof){
                    cursorBof.parentNode.removeChild(cursorBof);
                }
                if(cursorEof){
                    cursorEof.parentNode.removeChild(cursorEof);
                }
            }else if(cursorBof){
                captureSelection();
                var range = document.createRange();
                if(cursorEof){
                    range.setStartAfter(cursorBof);
                    range.setEndBefore(cursorEof);

                    cursorBof.parentNode.removeChild(cursorBof);
                    cursorEof.parentNode.removeChild(cursorEof);
                    
                    selection.removeAllRanges();
                    selection.addRange(range);
                }else {
                    range.selectNode(cursorBof);
                    selection.removeAllRanges();
                    selection.addRange(range);

                    document.execCommand('delete', false, null);
                }
            }
            for(var i = 0; i < afterFocus.length; i++){afterFocus[i]();}
            afterFocus = [];
            captureSelection();
        }, 10);
    };
}