import FullList from "../model/FullList";

interface DOMList {
    ul: HTMLDListElement
    clear(): void
    render(fullList: FullList):void
}

export default class ListTemplate implements DOMList {

    ul: HTMLDListElement 
    static instance: ListTemplate = new ListTemplate()
    
    private constructor () {
        this.ul = document.getElementById("listItems") as HTMLUListElement
    }
    clear(): void {
        this.ul.innerHTML = ""
    }
    render(fullList: FullList): void {
        this.clear()
        fullList.list.forEach(item => {
            const Li = document.createElement("li") as HTMLElement
            Li.className= "item"

            const check = document.createElement("input") as HTMLInputElement
            check.type = "checkbox"
            check.id = item.id
            check.tabIndex = 0
            check.checked = item.checked
            Li.append(check)

            check.addEventListener("change", () => {
                item.checked = !item.checked
                fullList.save()
            })
            const label = document.createElement("label") as HTMLLabelElement
            label.htmlFor = item.id
            label.textContent = item.item
            Li.append(label)

            const button = document.createElement("button") as HTMLButtonElement
            button.className = "button"
            button.textContent = "X"
            Li.append(button)
            button.addEventListener("click", () => {
                fullList.remove(item.id)
                this.render(fullList)
            })

            this.ul.append(Li)
        })
    }
}