$slides = Get-ChildItem "temp_pptx\ppt\slides\slide*.xml" | Sort-Object { [int]($_.BaseName -replace 'slide', '') }
foreach ($slide in $slides) {
    echo "`n--- $($slide.BaseName) ---"
    $xml = [xml](Get-Content $slide.FullName)
    $nodes = $xml.GetElementsByTagName("a:t")
    $text = ""
    foreach ($node in $nodes) {
        $text += $node.InnerText + " "
    }
    echo $text
}
